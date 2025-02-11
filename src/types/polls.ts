import { Nullable, GraphQLNode, GraphQLNodes, WPImage, WPSeo } from '@/types';

export type WPPollLtd = {
  id: string;
  databaseId: number;
  title: string;
  uri: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  pollDetails: {
    description: string;
  };
};

export type WPPollList = GraphQLNodes<WPPollLtd>;

export type WPPoll = {
  databaseId: number;
  date: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  id: string;
  seo: WPSeo;
  slug: string;
  title: string;
  uri: string;
  pollDetails: {
    description: string;
    expiration: Nullable<string>;
    limited: boolean;
    pollOptions: {
      body: string;
      votes: number;
      id: string;
    }[];
    question: string;
  };
};
