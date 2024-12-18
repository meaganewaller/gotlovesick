/* eslint @typescript-eslint/no-var-requires: "off" */
/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'lvh.me',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'wp.mysecretgardens.blog",'
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = withSentryConfig(
  module.exports,
  {
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
