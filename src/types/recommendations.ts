import { WPSeo, GraphQLNodes, GraphQLNode, WPImage, Nullable } from '@/types';

export type Genre = {
  databaseId: number;
  name: string;
  parentDatabaseId: number;
  children?: Genre[];
};

export type Rec = {
  id: string;
  slug: string;
  uri: string;
  databaseId: number;
  title: string;
  date: string;
  seo?: WPSeo;
  content?: string;
};

export type BookRec = Rec & {
  genres: GraphQLNodes<Genre>;
  bookRecDetails: {
    author: string;
    ageRange: string[];
    bookCover: GraphQLNode<WPImage>;
    bookTitle: string;
    contentWarnings: Nullable<string>;
    rating: number;
    year: number;
  };
};
