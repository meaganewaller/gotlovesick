/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONT_SITE_URL || `http://lvh.me:3000`,
  chagefreq: 'daily',
  priority: 0.7,
  generateRobotsTxt: true,
  exclude: [
    '/user/login',
    '/help',
    '*/search*',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_FRONT_SITE_URL}/sitemap.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*.jpg$',
          '/*.jpeg$',
          '/*.gif$',
          '/*.png$',
          '/*.bmp$',
          '/wp-admin/',
          '/wp-includes/',
          '/cgi-bin/',
          '/wp-content/plugins/',
          '/wp-content/themes/',
          '/wp-content/cache/',
          '/author/',
          '/trackback/',
          '/user/',
          '/help/',
          '/search/',
        ],
      },
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
    ],
  },
};
