/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Remove any experimental features that might cause hydration issues
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;