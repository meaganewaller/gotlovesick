/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      String(process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL).split("/")[2],
      "0.gravatar.com",
      "1.gravatar.com",
      "2.gravatar.com",
      "secure.gravatar.com",
    ],
    remotePatterns: [
      {
        hostname: 'localhost'
      },
      {
        hostname: 'lvh.me'
      },
      {
        hostname: 'i.imgur.com'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
