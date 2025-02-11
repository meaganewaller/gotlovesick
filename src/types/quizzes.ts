import type { GraphQLNodes, GraphQLNode, Nullable, WPImage } from '@/types';
import { JSX, ReactNode } from 'react';

export type WPQuizLtd = {
  id: string;
  databaseId: number;
  title: string;
  uri: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  quizFields: {
    description: string;
  };
};

export type WPQuizList = GraphQLNodes<WPQuizLtd>;

export type WPQuiz = {
  id: string;
  databaseId: number;
  title: string;
  uri: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  quizFields: {
    description: string;
    autoScroll: boolean;
    results: {
      resultId: string;
    }[];
    questions: {}[];
  };
};

export interface ISelectedAnswer {
  questionIndex: number;
  answerIndex: number;
  resultId: number;
}

export type AnswerType = {
  answer: Nullable<string>;
  onAnswerSelection?: (
    questionIndex: Nullable<number>,
    answerIndex: Nullable<number>,
    resultId: Nullable<number>
  ) => void;
  revealResponse?: {
    title?: string | JSX.Element;
    description?: string | JSX.Element;
    image?: string;
    imageAttribution?: string;
  };
  resultId: number;
};

export type QuestionType = {
  question: string;
  questionRelativeToImage?: 'adjacent' | 'overlap' | null;
  answerArrangement?: 'row' | 'tile' | null;
  backgroundColor?: string;
  backgroundImageSrc?: string;
  imageAttribution?: string;
  fontColor?: string;
  answers: AnswerType[];
};

export interface ListItemContainerElementProps {
  className: string;
  name: string;
  children: ReactNode;
  parentBindings?: {
    dom: HTMLElement;
  };
}

export interface QuestionProps {
  item: QuestionType;
  questionIndex: number;
  generalBackgroundColor?: string;
  generalFontColor?: string;
  resultsAvailable: boolean;
  onAnswerSelection?: (
    questionIndex?: number,
    answerIndex?: number,
    resultId?: number
  ) => void;
}

export interface AnswersProps {
  item: QuestionType;
  questionIndex: number;
  resultsAvailable: boolean;
  changeSelectedAnswerResponse: React.Dispatch<
    React.SetStateAction<{
      title?: string | JSX.Element;
      description?: string | JSX.Element;
      image?: string;
      imageAttribution?: string;
    }>
  >;
  onAnswerSelection?: (
    questionIndex?: number,
    answerIndex?: number,
    resultId?: number
  ) => void;
  generalBackgroundColor?: string;
  generalFontColor?: string;
}
