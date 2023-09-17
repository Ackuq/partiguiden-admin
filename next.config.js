/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    // Tell webpack to ignore canvas
    config.externals.push('canvas');
    return config;
  },
};

module.exports = nextConfig;
