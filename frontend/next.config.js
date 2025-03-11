// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      optimizeCss: true,
    },
    // Ensure styles are loaded properly
    webpack(config) {
      return config;
    },
  }