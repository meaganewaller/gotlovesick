import { JSX, ReactNode, Dispatch, SetStateAction } from 'react';
import { Nullable , WPSeo, GraphQLNodes, WPImage, GraphQLNode } from '@/types';

// export type WPQuiz = {
//   key: string;
//   title: string;
//   slug: string;
//   uri: string;
//   seo?: WPSeo;
//   featuredImage?: Nullable<GraphQLNode<WPImage>>;
//   quizFields: {
//     description: string;
//   }
// }
//
// export type QuizQuestionAnswer = {
//   answer: string
//   backgroundColor: Nullable<string>;
//   backgroundImageSrc?: {
//     node: {
//       sourceUrl: string;
//     }
//   }
//   fontColor: Nullable<string>
// }
//
// export type QuizQuestion = {
//   answerArrangement: string
//   answers: QuizQuestionAnswer[]
//   backgroundColor: Nullable<string>
//   backgroundImageSrc?: Nullable<GraphQLNode<{ sourceUrl: string }>>
//   fontColor: Nullable<string>
//   imageAttribution?: string
//   question: string
//   questionRelativeToImage: string;
// }
//
// export type QuizResult = {
//   description: string
//   imageAttribution: Nullable<string>
//   resultId: Number
//   resultImageSrc: Nullable<GraphQLNode<WPImage>>
//   title: string
// }
//
// export type WPQuizFull = {
//   key: string
//   title: string
//   slug: string
//   uri: string
//   seo?: WPSeo
//   featuredImage?: Nullable<GraphQLNode<WPImage>>
//   quizFields: {
//     description: string;
//     showCopyShareButton: boolean;
//     autoScroll: boolean;
//     generalBackgroundColor: Nullable<string>;
//     generalFontColor: Nullable<string>;
//     questions: QuizQuestion[]
//     results: QuizResult[]
//   }
// }
//
// export interface IQuiz {
//   title: string;
//   description: string;
//   copyShareButton: boolean;
//   copyShareLink?: string;
//   onResult?: () => void;
//   onAnswerSelection?: (
//     questionIndex?: number,
//     answerIndex?: number,
//     resultId?: number
//   ) => void;
//   onRestart?: () => void;
//   questions: QuizQuestion[]
//   results: QuizResult[]
// };
//
// export type AnswerType = {
//   answer: Nullable<string>;
//   onAnswerSelection?: (
//     questionIndex: Nullable<number>,
//     answerIndex: Nullable<number>,
//     resultId: Nullable<number>
//   ) => void;
//   revealResponse?: {
//     title?: string | JSX.Element;
//     description?: string | JSX.Element;
//     image?: string;
//     imageAttribution?: string;
//   };
//   resultId: number;
// };
//
// export interface AnswersProps {
//   item: QuestionType;
//   questionIndex: number;
//   resultsAvailable: boolean;
//   changeSelectedAnswerResponse: React.Dispatch<
//     React.SetStateAction<{
//       title?: string | JSX.Element;
//       description?: string | JSX.Element;
//       image?: string;
//       imageAttribution?: string;
//     }>
//   >;
//   onAnswerSelection?: (
//     questionIndex?: number,
//     answerIndex?: number,
//     resultId?: number
//   ) => void;
//   generalBackgroundColor?: string;
//   generalFontColor?: string;
// }
//
// export interface ISelectedAnswer {
//   questionIndex: number;
//   answerIndex: number;
//   resultId: number;
// }
//
// export interface ListItemContainerElementProps {
//   className: string;
//   name: string;
//   children: ReactNode;
//   parentBindings?: {
//     dom: HTMLElement;
//   };
// }
//
// export type QuestionType = {
//   question: string;
//   questionRelativeToImage?: 'adjacent' | 'overlap' | null;
//   answerArrangement?: 'row' | 'tile' | null;
//   backgroundColor?: string;
//   fontColor?: string;
//   answers: AnswerType[];
// };
//
// export interface QuestionProps {
//   item: QuestionType;
//   questionIndex: number;
//   generalBackgroundColor?: string;
//   generalFontColor?: string;
//   resultsAvailable: boolean;
//   onAnswerSelection?: (
//     questionIndex?: number,
//     answerIndex?: number,
//     resultId?: number
//   ) => void;
// }
//
// export interface QuestionResponseProps {
//   questionIndex: number;
//   title?: string | JSX.Element;
//   description?: string | JSX.Element;
//   image?: string;
//   imageAttribution?: string;
// }
//
// type ResultImageType =
//   | {
//       resultImageSrc?: Nullable<string>;
//       imageAttribution?: never;
//     }
//   | {
//       resultImageSrc?: string;
//       imageAttribution?: string;
//     };
//
// export type ResultType = ResultImageType & {
//   title: string;
//   description: string;
//   onResult?: () => void;
//   resultId: number;
// };
//
// export interface ResultProps {
//   title: string;
//   resultsAvailable: boolean;
//   finalResult: ResultType[];
//   copyShareButton: boolean;
//   copyShareLink?: string;
//   shareLinkClicked: boolean;
//   changeShareLinkClicked: Dispatch<SetStateAction<boolean>>;
//   shareLinkAnimatingOut: boolean;
//   changeShareLinkAnimatingOut: Dispatch<SetStateAction<boolean>>;
//   changeResultsAvailable: Dispatch<SetStateAction<boolean>>;
//   changeSelectedAnswers: Dispatch<SetStateAction<ISelectedAnswer[]>>;
//   changeFinalResult: Dispatch<SetStateAction<ResultType[]>>;
//   onResult?: () => void;
//   onRestart?: () => void;
// }
//
// export interface CopyLinkButtonProps {
//   shareLinkClicked: boolean;
//   changeShareLinkClicked: Dispatch<SetStateAction<boolean>>;
//   shareLinkAnimatingOut: boolean;
//   copyShareLink?: string;
//   isMobile?: boolean;
// }
//
// export type WPFunExtrasType = {
//   key: string;
//   funExtras: Nullable<
//     GraphQLNodes<{
//       key: string;
//       title: string;
//       slug: string;
//       uri: string;
//     }>
//   >;
// };
//
