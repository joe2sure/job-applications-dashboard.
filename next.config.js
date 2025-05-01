/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Your ESLint configuration here
    ignoreDuringBuilds: true, // This will ignore ESLint errors during production builds
  },
};

module.exports = nextConfig;