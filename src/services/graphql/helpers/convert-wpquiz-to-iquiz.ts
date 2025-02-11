'use client';

// import type { IQuiz, WPQuizFull } from '@/types'
import FirstResultImage from '~/images/hearts.gif';
import SecondResultImage from '~/images/logo.png';
import { CONFIG } from '@/utils/config';

export const convertWPQuizToIQuiz = (quiz: any): any => {
  return {
    title: quiz.title,
    description: quiz.quizFields.description,
    copyShareButton: quiz.quizFields.showCopyShareButton,
    copyShareLink: `${CONFIG.url}${quiz.uri}`,
    questions: quiz.quizFields.questions,
    results: quiz.quizFields.results,
  };
};
