#!/usr/bin/env bash
# Production deploy for has-nain.dev, run on the Oracle VM.
#
# Installed once at /home/ubuntu/portfolio/bin/deploy and pinned as the forced command of
# the CI deploy key in ~/.ssh/authorized_keys, so that key can run nothing else:
#   restrict,command="/home/ubuntu/portfolio/bin/deploy" ssh-ed25519 AAAA... github-actions-deploy
# Editing this file in the repo does NOT change the VM copy. Reinstall it by hand.
#
# Commands (taken from $SSH_ORIGINAL_COMMAND, or from argv when run by hand):
#   deploy <sha>   read `git archive` tar.gz of <sha> on stdin, build a new release,
#                  switch PM2 to it, health-check, restore the previous release on failure
#   rollback       switch PM2 back to the previous release
#   status         print the live and previous release
#
# Layout:
#   ~/portfolio/releases/<utc-time>-<sha12>/   one dir per build (newest KEEP kept)
#   ~/portfolio/shared/.env.local              symlinked into every release
#   ~/portfolio/current, ~/portfolio/previous  symlinks to the live and last release

# nvm is not loaded for non-interactive SSH. Load it before `set -u` because nvm.sh trips on unset vars.
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh" >/dev/null && nvm use 22 >/dev/null || { echo "[deploy] ERROR: nvm/node 22 not found" >&2; exit 1; }
set -euo pipefail

BASE=${DEPLOY_BASE:-/home/ubuntu/portfolio} # override only for local testing
RELEASES=$BASE/releases
ENV_FILE=$BASE/shared/.env.local
APP=portfolio
PORT=3000
KEEP=3

log() { printf '[deploy] %s\n' "$*"; }
die() { printf '[deploy] ERROR: %s\n' "$*" >&2; exit 1; }
rev_of() { cat "$1/REVISION" 2>/dev/null || echo legacy; }

start_app() { # $1 = release dir. Brief 502s from Caddy while Next boots (single port).
  pm2 delete "$APP" >/dev/null 2>&1 || true
  pm2 start "$1/node_modules/next/dist/bin/next" --name "$APP" --cwd "$1" \
    -- start -H 127.0.0.1 -p "$PORT" >/dev/null
}

healthy() { # $1 = release dir that must be the one PM2 is running
  local i
  for i in $(seq 1 30); do
    if pm2 jlist | node -e '
        const [name, cwd] = process.argv.slice(1);
        const p = JSON.parse(require("fs").readFileSync(0, "utf8")).find((x) => x.name === name);
        process.exit(p && p.pm2_env.status === "online" && p.pm2_env.pm_cwd === cwd ? 0 : 1);
      ' "$APP" "$1" &&
      curl -fsS -o /dev/null --max-time 5 "http://127.0.0.1:$PORT/" &&
      curl -fsS -o /dev/null --max-time 5 "http://127.0.0.1:$PORT/robots.txt"; then
      log "healthy on 127.0.0.1:$PORT ($(rev_of "$1"))"
      return 0
    fi
    sleep 2
  done
  return 1
}

switch_to() { # $1 = target, $2 = fallback. Returns 0 when target is live.
  start_app "$1"
  if healthy "$1"; then
    ln -sfn "$2" "$BASE/previous"
    ln -sfn "$1" "$BASE/current"
    pm2 save >/dev/null
    return 0
  fi
  log "health check failed for $(basename "$1"); restoring $(basename "$2")"
  start_app "$2"
  healthy "$2" || die "RESTORE FAILED: $(basename "$2") is unhealthy too. Check: pm2 logs $APP"
  pm2 save >/dev/null
  return 1
}

prune() {
  local cur prev all i d
  cur=$(readlink -f "$BASE/current")
  prev=$(readlink -f "$BASE/previous" || true)
  shopt -s nullglob
  all=("$RELEASES"/*/) # names start with a UTC timestamp, so the glob is oldest-first
  for ((i = 0; i < ${#all[@]} - KEEP; i++)); do
    d=${all[i]%/}
    [[ $d == "$cur" || $d == "$prev" ]] || rm -rf -- "$d"
  done
}

deploy() {
  local sha=${1:-} rel cur
  [[ $sha =~ ^[0-9a-f]{40}$ ]] || die "usage: deploy <40-char commit sha>"
  [[ -f $ENV_FILE ]] || die "$ENV_FILE is missing"
  cur=$(readlink -f "$BASE/current")
  [[ -d $cur ]] || die "$BASE/current does not point at a release"

  rel="$RELEASES/$(date -u +%Y%m%d%H%M%S)-${sha:0:12}"
  mkdir -p "$rel"
  log "receiving $sha into $(basename "$rel")"
  tar -xzf - -C "$rel"
  printf '%s\n' "$sha" >"$rel/REVISION"
  ln -s "$ENV_FILE" "$rel/.env.local"

  # Full output goes to files in the release dir. Only a tail is printed on failure.
  log "npm ci"
  (cd "$rel" && npm ci --no-audit --no-fund) >"$rel/install.log" 2>&1 ||
    { tail -n 30 "$rel/install.log"; die "npm ci failed; live site untouched"; }

  log "next build (CI already linted and type-checked this commit)"
  (cd "$rel" && NEXT_TELEMETRY_DISABLED=1 SKIP_BUILD_CHECKS=1 npm run build) >"$rel/build.log" 2>&1 ||
    { tail -n 40 "$rel/build.log"; die "build failed; live site untouched"; }

  # getSiteData() swallows MongoDB errors and the homepage is ISR (revalidate = 1 day),
  # so a build without data would serve an empty site for up to 24h. Refuse it.
  if grep -q 'could not load data from MongoDB' "$rel/build.log"; then
    die "homepage was built without MongoDB data; live site untouched (see $rel/build.log)"
  fi

  log "switching PM2: $(basename "$cur") -> $(basename "$rel")"
  switch_to "$rel" "$cur" || die "deploy failed; $(basename "$cur") restored and healthy"
  log "live: $sha"
  prune
}

rollback() {
  local cur prev
  cur=$(readlink -f "$BASE/current")
  prev=$(readlink -f "$BASE/previous" || true)
  [[ -n $prev && -d $prev && $prev != "$cur" ]] || die "no previous release to roll back to"
  log "rolling back: $(basename "$cur") -> $(basename "$prev")"
  switch_to "$prev" "$cur" || die "rollback target unhealthy; stayed on $(basename "$cur")"
  log "live: $(rev_of "$prev")"
}

read -r action arg _ <<<"${SSH_ORIGINAL_COMMAND:-$*}"
case ${action:-} in
  status)
    echo "current_revision=$(rev_of "$BASE/current")"
    echo "current=$(readlink -f "$BASE/current")"
    echo "previous=$(readlink -f "$BASE/previous" 2>/dev/null || echo none)"
    ;;
  deploy | rollback)
    mkdir -p "$RELEASES"
    exec 9>"$BASE/.deploy.lock"
    flock -n 9 || die "another deploy or rollback is running"
    "$action" "${arg:-}"
    ;;
  *) die "unknown command; use: deploy <sha> | rollback | status" ;;
esac
