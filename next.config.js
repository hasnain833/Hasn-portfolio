/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/concepts', destination: '/concepts/index.html' },
      { source: '/concepts/:slug', destination: '/concepts/:slug/index.html' },
    ];
  },
};


module.exports = nextConfig;
