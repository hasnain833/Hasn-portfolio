const adminHost = (process.env.ADMIN_HOST || '').toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').split(':')[0];
const adminHostPattern = adminHost.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set by the deploy after CI has linted and type-checked the same commit:
  // repeating both inside `next build` costs memory the 1 GB VM doesn't have.
  typescript: { ignoreBuildErrors: process.env.SKIP_BUILD_CHECKS === '1' },
  eslint: { ignoreDuringBuilds: process.env.SKIP_BUILD_CHECKS === '1' },
  // These CDN routing rules preserve the admin domain without running
  // middleware for every public page, image or upload.
  async redirects() {
    if (!adminHost) return [];
    return [{
      source: '/:path((?!admin(?:/|$)|api(?:/|$)|_next(?:/|$)|favicon\\.ico|icon|apple-icon|manifest\\.webmanifest|robots\\.txt|img(?:/|$)).*)',
      has: [{ type: 'host', value: adminHostPattern }],
      destination: '/admin',
      permanent: false,
    }];
  },
  async headers() {
    if (!adminHost) return [];
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: adminHostPattern }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};


module.exports = nextConfig;
