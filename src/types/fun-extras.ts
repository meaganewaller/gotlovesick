import { JSX, ReactNode } from 'react'
import type { GraphQLNodes, GraphQLNode, Nullable, WPImage, WPSeo } from "@/types"

export type WPFunExtraType = {
  key: string
  name: string
  count: number
  description: Nullable<string>
  funExtras: GraphQLNodes<WPFunExtra>
}

export type WPFunExtra = {
  key: string
  title: string
  link: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
}

export type WPPollLtd = {
  key: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  pollDetails: {
    description: string
  }
}

export type WPQuizLtd = {
  key: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  quizFields: {
    description: string
  }
}

export type WPPollList = GraphQLNodes<WPPollLtd>

export type WPQuizList = GraphQLNodes<WPQuizLtd>

export type WPPoll = {
  key: string
  id: string
  slug: string
  date: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  seo: WPSeo
  pollDetails: {
    description: string
    limited: Boolean
    expiration: Nullable<string>
    question: string
    pollOptions: {
      body: string
      votes: number
      id: string
    }[]
  }
}

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

export interface ListItemContainerElementProps {
  className: string;
  name: string;
  children: ReactNode;
  parentBindings?: {
    dom: HTMLElement;
  };
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

export type WPQuizQuestion = {
  answerArrangement?: 'row' | 'tile' | null;
  answers: QuizQuestionAnswer[]
  backgroundColor: Nullable<string>
  backgroundImageSrc: Nullable<GraphQLNode<WPImage>>
  fontColor: Nullable<string>
  imageAttribution: Nullable<string>
  question: string
  questionRelativeToImage: string
}

export type WPQuizResult = {
  description: string
  imageAttribution: Nullable<string>
  resultId: number
  resultImageSrc: Nullable<GraphQLNode<WPImage>>
  title: string
}

export type WPQuiz = {
  key: string
  date: string
  modified: string
  title: string
  uri: string
  featuredImage: Nullable<GraphQLNode<WPImage>>
  seo: WPSeo
  quizFields: {
    description: string
    autoScroll: Boolean
    generalBackgroundColor: Nullable<string>
    generalFontColor: Nullable<string>
    showCopyShareButton: Boolean
    questions: WPQuizQuestion[]
    results: WPQuizResult[]
  }
}

export type QuizResult = {
  description: string
  imageAttribution: Nullable<string>
  resultId: Number
  resultImageSrc: Nullable<GraphQLNode<WPImage>>
  title: string
}

export type QuizQuestionAnswer = {
  answer: string
  backgroundColor: Nullable<string>;
  backgroundImageSrc: Nullable<GraphQLNode<{ sourceUrl: string }>>
  fontColor: Nullable<string>
  imageAttribution: Nullable<string>
  resultId: number
  revealResponse: {
    description: Nullable<string>
    image: Nullable<GraphQLNode<WPImage>>
  }
}

export type QuizQuestion = {
  answerArrangement: string
  answers: QuizQuestionAnswer[]
  backgroundColor: Nullable<string>
  backgroundImageSrc?: Nullable<GraphQLNode<{ sourceUrl: string }>>
  fontColor: Nullable<string>
  imageAttribution?: string
  question: string
  questionRelativeToImage: string;
}

export interface IQuiz {
  key: string
  title: string;
  description: string;
  copyShareButton: boolean;
  copyShareLink?: string;
  onResult?: () => void;
  onAnswerSelection?: (
    questionIndex?: number,
    answerIndex?: number,
    resultId?: number
  ) => void;
  onRestart?: () => void;
  questions: QuizQuestion[]
  results: QuizResult[]
};

export interface ISelectedAnswer {
  questionIndex: number;
  answerIndex: number;
  resultId: number;
}


