export const GITHUB_API = 'https://api.github.com/graphql'
export const LASTFM_USERNAME = process.env.NEXT_PUBLIC_LASTFM_USER
export const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY
export const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/'

export const PERSONAL_LINKS = {
  GITHUB: 'https://github.com/meaganewaller',
  LINKEDIN: 'https://www.linkedin.com/in/meaganwaller',
} as const;

/**
 * App routes.
 *
 * All static routes should be configured here to avoid 404 if a route changes.
 */
export const ROUTES = {
  ARTICLE: '/article',
  BLOG: '/blog',
  CONTACT: '/contact',
  HOME: '/',
  NOT_FOUND: '/404',
  PROJECTS: '/projects',
  RSS: '/feed',
  BOOKMARKS: '/bookmarks',
  SEARCH: '/search',
  CATEGORIES: '/category',
  TAGS: '/tag',
} as const;

export const PAGINATED_ROUTE_PREFIX = '/page'

export const ARTICLE_ID = 'post';
export const AUTHOR_ID = 'bio';
export const COMMENT_ID_PREFIX = 'comment-';
export const COMMENTS_SECTION_ID = 'comments';

export const STORAGE_KEY = {
  MOTION: 'reduced-motion',
  PRISM: 'prismjs-color-scheme',
  THEME: 'theme',
} as const;

export const PRISM_THEME_ATTRIBUTE = 'data-prismjs-color-scheme-current'

export const VALID_THEMES = ['light', 'dark', 'cupcake'] as const;
