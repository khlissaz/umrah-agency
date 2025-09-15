const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
  env: {
    NUSUK_API_URL: process.env.NUSUK_API_URL,
    NUSUK_API_KEY: process.env.NUSUK_API_KEY,
  },
};

module.exports = withNextIntl(nextConfig);