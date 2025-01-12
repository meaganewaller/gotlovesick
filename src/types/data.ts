import type { StaticImageData } from 'next/image';
import type { Nullable } from './generics';
import type { GraphQLNode, GraphQLNodes } from './gql';

export enum MenuLocationEnum {
  Sidebar = 'SIDEBAR_MENU',
  Blog = 'BLOG_MENU',
  Bookmarks = 'BOOKMARKS_MENU',
  Shrines = 'SHRINES_MENU',
  Header = 'HEADER_MENU',
  Resources = 'RESOURCES_MENU',
}

export type SlugNode = {
  slug: string;
};

//===========================================================================
// Data from WordPress
//===========================================================================

type WPSeo = {
  metaDesc: string;
  title: string;
  breadcrumbs: Nullable<
    {
      text: string;
      url: string;
    }[]
  >;
};

type WPCommentAuthorAvatar = {
  height: number;
  url: string;
  width: number;
};

type WPCommentAuthor = {
  avatar: Nullable<WPCommentAuthorAvatar>;
  name: string;
  url: Nullable<string>;
};

export type WPCommentStatus = 'APPROVE' | 'HOLD' | 'SPAM' | 'TRASH';

export type WPComment = {
  approved: boolean;
  author: GraphQLNode<WPCommentAuthor>;
  content: string;
  databaseId: number;
  date: string;
  parentDatabaseId: number;
  status: WPCommentStatus;
};

type WPContentParts = {
  afterMore: string;
  beforeMore: string;
};

export type WPImage = {
  altText: Nullable<string>;
  mediaDetails: {
    height: number;
    width: number;
  };
  sourceUrl: string;
  title: Nullable<string>;
};

type WPInfo = { wordsCount: number };

type WPContent = {
  contentParts: WPContentParts;
  databaseId: number | string;
  date: string;
  featuredImage?: Nullable<GraphQLNode<WPImage>>;
  modified: string;
  seo: WPSeo;
  slug: string;
  title: string;
};

export type WPPage = WPContent & {
  info: WPInfo;
  content: string;
};

type WPPostAuthor = { name: string };

type WPAcfPosts = {
  postsInCategory: Nullable<WPCategoryPreview[]>;
  postsInTag: Nullable<WPTagPreview[]>;
};

export type WPMenuItem = {
  key: string;
  url: string;
  title: string;
  order: number;
  path: string;
  parentId: Nullable<string>;
};

export type WPMenu = {
  nodes: WPMenuItem[];
};

export type MenuItem = {
  key: string;
  parentId: Nullable<string>;
  title: string;
  url: string;
  path: string;
  order: number;
}

export type NestedMenuItem = MenuItem & {
  children: MenuItem[];
}

export type WPPost = WPContent & {
  acfPosts: Nullable<Partial<WPAcfPosts>>;
  author: GraphQLNode<WPPostAuthor>;
  commentCount: Nullable<number>;
  info: WPInfo;
};

export type WPShrine = {
  content: string;
  contentParts: WPContentParts;
  databaseId: number;
  date: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  id: string;
  modified: string;
  seo: WPSeo;
  slug: string;
  title: string;
  shrineDetails: Nullable<{
    featuredSections: Nullable<{ content: string; title: string }[]>;
    sidebar: Nullable<
      GraphQLNodes<{
        id: string;
        databaseId: number;
        title: string;
        slug: string;
        uri: string;
      }>
    >;
    shortDescription: Nullable<string>;
    headerImage: Nullable<GraphQLNode<WPImage>>;
  }>;
};

export type WPResource = WPContent & {
  info: WPInfo;
};

export type WPResourceType = {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  count: number;
  resources: GraphQLNode<WPResource>[];
};

export type WPLog = WPContent;

export type WPBookmark = WPContent & {
  author: GraphQLNode<WPPostAuthor>;
  commentCount: Nullable<number>;
  info: WPInfo;
};

export type WPPostPreview = Pick<
  WPPost,
  | 'commentCount'
  | 'databaseId'
  | 'date'
  | 'featuredImage'
  | 'info'
  | 'modified'
  | 'slug'
  | 'title'
> & {
  acfPosts:
  | Nullable<Pick<WPAcfPosts, 'postsInCategory'>>
  | Nullable<Pick<WPAcfPosts, 'postsInTag'>>;
  contentParts: Pick<WPContentParts, 'beforeMore'>;
};

export type WPBookmarkPreview = Pick<
  WPBookmark,
  | 'commentCount'
  | 'databaseId'
  | 'date'
  | 'featuredImage'
  | 'info'
  | 'modified'
  | 'slug'
  | 'title'
> & {
  contentParts: Pick<WPContentParts, 'beforeMore'>;
};

export type RecentWPResource = Pick<
  WPPost,
  'date' | 'featuredImage' | 'slug' | 'title'
> & {
  databaseId: number;
};

export type RecentWPPost = Pick<
  WPPost,
  'date' | 'featuredImage' | 'slug' | 'title'
> & {
  databaseId: number;
};

export type RecentWPLog = Pick<
  WPPost,
  'date' | 'slug' | 'title' | 'contentParts'
> & {
  databaseId: number;
};

export type RecentWPBookmark = Pick<
  WPBookmark,
  'date' | 'featuredImage' | 'slug' | 'title'
> & {
  databaseId: number;
};

type WPAcfCategories = {
  postsInCategory: Nullable<WPPostPreview[]>;
};

export type WPCategory = WPContent & {
  acfCategories: Nullable<WPAcfCategories>;
};

export type WPCategoryPreview = Pick<
  WPCategory,
  'databaseId' | 'slug' | 'title'
>;

type WPAcfTag = {
  officialWebsite: Nullable<string>;
  postsInTag: Nullable<WPPostPreview[]>;
};

export type WPTag = WPContent & {
  acfTags: Nullable<WPAcfTag>;
};

export type WPTagPreview = Pick<
  WPTag,
  'databaseId' | 'featuredImage' | 'slug' | 'title'
>;

//===========================================================================
// Data from MDX files
//===========================================================================

export type MDXData = {
  file: string;
  image: MDXImage;
};

export type MDXImage = StaticImageData & {
  alt: string;
  title?: string;
};

export type MDXPageMeta = Omit<PageMeta, 'wordsCount'> & {
  intro: string;
  title: string;
};

export type MDXProjectMeta = Omit<ProjectMeta, 'wordsCount'> & {
  intro: string;
  title: string;
};

//===========================================================================
// Data used in this application
//===========================================================================

export type Dates = {
  publication: string;
  update?: string;
};

export type SEO = {
  description: string;
  title: string;
};

export type Img = {
  alt: string;
  height: number;
  src: string;
  title?: string;
  width: number;
};

export type CommentAuthor = {
  avatar?: Omit<Img, 'title'>;
  name: string;
  website?: string;
};

export type CommentMeta = {
  author: CommentAuthor;
  date: string;
};

export type SingleComment = {
  content: string;
  id: number;
  isApproved: boolean;
  meta: CommentMeta;
  parentId?: number;
  replies: SingleComment[];
};

export type PageMeta = {
  cover?: Img;
  dates: Dates;
  seo: SEO;
  wordsCount: number;
};

export type Page = {
  content: string;
  intro: string;
  slug: string;
  title: string;
};

export type PageLink = {
  id: number;
  logo?: Img;
  name: string;
  url: string;
};

type ArticleMeta = PageMeta & {
  author?: string;
  commentsCount?: number;
  categories?: PageLink[];
  tags?: PageLink[];
};

export type Article = Page & {
  id: number;
  meta: ArticleMeta;
};

export type ArticlePreview = Pick<Article, 'intro' | 'slug' | 'title'> & {
  id: number;
  meta: Omit<ArticleMeta, 'author' | 'seo' | 'tags'>;
};

export type RecentArticle = Pick<Article, 'slug' | 'title'> &
  Pick<ArticleMeta, 'cover' | 'commentsCount' | 'categories'> & {
    id: number;
    publicationDate: string;
  };

export type Repos = {
  github?: string;
  gitlab?: string;
};

export type ProjectMeta = Omit<PageMeta, 'wordsCount'> & {
  contexts?: string[];
  license?: string;
  repos: Repos;
  tagline?: string;
  technologies?: string[];
};

export type Project = Omit<Page, 'content'> & {
  id: string;
  meta: ProjectMeta;
};

export type ProjectPreview = Omit<Project, 'meta'> & {
  meta: Pick<ProjectMeta, 'contexts' | 'cover' | 'dates' | 'tagline'>;
};

export type CategoryMeta = Omit<PageMeta, 'wordsCount'> & {
  articles?: ArticlePreview[];
  relatedTags?: PageLink[];
};

export type Category = Page & {
  id: number;
  meta: CategoryMeta;
};

export type TagMeta = Omit<PageMeta, 'wordsCount'> & {
  articles?: ArticlePreview[];
  relatedCategories?: PageLink[];
  website?: string;
};

export type Tag = Page & {
  id: number;
  meta: TagMeta;
};

export type GithubRepositoryMeta = {
  createdAt: string;
  stargazerCount: number;
  updatedAt: string;
};

export type Bookmark = Page & {
  databaseId: number;
  id: number;
};

export type Log = {
  date: string;
  databaseId: number | string;
  content: string;
  slug: string;
  title: string;
};

export type LastFmTrack = {
  album: { '#text': string; mbid: string };
  streamable: string;
  artist: { '#text': string };
  date: { uts: string; '#text': string };
  image: { size: string; '#text': string }[];
  '@attr': { nowplaying: string };
  name: string;
  playcount: string;
  url: string;
};

export type LastFmRecentTracksResponse = {
  recenttracks: {
    track: LastFmTrack[];
  };
};

export type WPWebDirectoryEntry = {
  id: string;
  title: string;
  uri: string;
}

export type WPWebDirectoryCategory = {
  key: string;
  title: string;
  slug: string;
  description: Nullable<string>;
  count: number;
  webDirectoryEntries: GraphQLNode<WPWebDirectoryEntry>[];
}

export type Song = {
  artist: string;
  description: Nullable<string>;
  link: Nullable<string>;
  songTitle: string;
  trackSide: ('A' | 'B')[];
}

export type WPPlaylist = {
  id: string;
  title: string;
  slug: string;
  seo: WPSeo;
  playlistDetails: {
    description: Nullable<string>;
    embed: Nullable<string>;
    featured: Nullable<boolean>;
    playlistCover: Nullable<GraphQLNode<WPImage>>;
    songs: Song[];
  }
  moods: Nullable<GraphQLNodes<{
    name: string;
    slug: string;
    id: string;
  }>>;
  genres: Nullable<GraphQLNodes<{
    name: string;
    slug: string;
    id: string;
  }>>;
  playlistActivities: Nullable<GraphQLNodes<{
    name: string;
    slug: string;
    id: string;
  }>>;
}
