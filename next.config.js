// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const path = require('path')
const allowedImageWordpressDomain = new URL( process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL ).hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'src/styles' ) ],
  },
  poweredByHeader: false,

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // The pre-commit hook takes care of linting
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [ allowedImageWordpressDomain, 'via.placeholder.com', 'lastfm.freetls.fastly.net', 'secure.gravatar.com' ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      cleanupIds: false,
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
      ],
    };
  },
};

const ContentSecurityPolicy = `
    default-src 'self' vercel.live;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com status.cafe counter1.fc2.com fc2.com ws.audioscrobbler.com;
    style-src 'self' 'unsafe-inline' vercel.live fonts.googleapis.com;
    img-src * blob: data:;
    media-src 'self';
    connect-src *;
    font-src 'self' vercel.live 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com;
    frame-src 'self' ${process.env.NEXT_PUBLIC_LAB_BASE_URL} vercel.live;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

module.exports = withBundleAnalyzer(nextConfig);
