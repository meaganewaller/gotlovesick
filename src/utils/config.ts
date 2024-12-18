const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging'

export const CONFIG = {
  api: {
    url: isStaging
      ? process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API
      : process.env.NEXT_PUBLIC_GRAPHQL_API,
  },
  name: 'Secret Gardens',
  baseline: 'The only key is mine',
  copyright: {
    startYear: '2024',
    endYear: new Date().getFullYear().toString(),
  },
  email: process.env.APP_AUTHOR_EMAIL ?? '',
  locales: {
    defaultLocale: 'en',
    defaultCountry: 'US',
    supported: ['en']
  },
  postsPerPage: 10,
  tiktokId: '@gotlovesickallovermybed',
  url:
    (isStaging
      ? process.env.NEXT_PUBLIC_STAGING_APP_URL
      : process.env.NEXT_PUBLIC_APP_URL
    ) ?? '',
}
