// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove the experimental optimizeCss option that's causing errors
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig;