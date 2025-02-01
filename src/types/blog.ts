import { Nullable, GraphQLNodes, WPCommentStatus } from "@/types"

export type Comment = {
  databaseId: number;
  parentDatabaseId: number;
  content: string;
  date: string;
  status: WPCommentStatus;
  author: {
    name: string;
    url: Nullable<string>;
    node: {
      avatar: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  replies?: Comment[];
};

export type Post = {
  key: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  author: {
    node: {
      name: string
      uri: string
      website: string
      key: string
      avatar: {
        url: string
        width: number
        height: number
      }
    }
  }
  seo: {
    title: string
    metaDesc: string
    breadcrumbs: {
      text: string
      url: string
    }[]
  }
  commentCount: number;
  date: string;
  featuredImage: {
    node: {
      altText: Nullable<string>
      caption: Nullable<string>
      mediaDetails: {
        height: number
        width: number
      }
      sourceUrl: string
    }
  }
  categories: GraphQLNodes<{
    key: string
    name: string
    slug: string
    uri: string
  }>
  tags: GraphQLNodes<{
    key: string
    name: string
    link: string
    slug: string
  }>
  comments: GraphQLNodes<Comment>;
}
