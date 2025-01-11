export const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
export const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';
export const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

export const CONFIG = {
  api: {
    url: isStaging
      ? process.env.NEXT_PUBLIC_STAGING_GRAPHQL_API
      : process.env.NEXT_PUBLIC_GRAPHQL_API,
  },
  name: 'Secret Gardens',
  baseline: 'The only key is mine',
  description: 'I hate it here so I will go to secret gardens in my mind.',
  shortDescription: 'I hate it here',
  accounts: {
    github: {
      username: 'meaganewaller',
      repo: 'meaganewaller.github.io',
    },
    tiktok: {
      username: '@gotlovesickallovermybed',
    },
  },
  copyright: {
    startYear: '2024',
    endYear: new Date().getFullYear().toString(),
  },
  email: process.env.APP_AUTHOR_EMAIL ?? '',
  locales: {
    defaultLocale: 'en',
    defaultCountry: 'US',
    supported: ['en'],
  },
  postsPerPage: 10,
  url:
    (isStaging
      ? process.env.NEXT_PUBLIC_STAGING_APP_URL
      : process.env.NEXT_PUBLIC_APP_URL) ?? '',
};
