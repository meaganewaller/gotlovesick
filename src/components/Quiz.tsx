'use client';

import React, { useState, useEffect, FC, createContext, Dispatch } from 'react';
import { scroller, Element } from 'react-scroll'
import Question from './Question';
import Result from './Result';
import { WPQuiz, ISelectedAnswer } from '@/types'
import '@/styles/pages/quizzes.css';
import { convertWPQuizToIQuiz } from '@/services/graphql';

interface ContextProps {
  selectedAnswers: any[]
  changeSelectedAnswers: Dispatch<React.SetStateAction<ISelectedAnswer[]>>;
  scrollFunction: (element: string, questionIndex: number) => void;
}

export const QuizContext = createContext<ContextProps>({
  selectedAnswers: [{ questionIndex: 0, resultId: 0, answerIndex: 0 }],
  changeSelectedAnswers: () => [],
  scrollFunction: () => {},
});

export const Quiz: FC<{ quiz: WPQuiz}> = (props) => {
  const { quiz } = props

  const convertedQuiz = convertWPQuizToIQuiz(quiz)

  const [selectedAnswers, changeSelectedAnswers] = useState<any[]>(
    []
  );

  const [resultsAvailable, changeResultsAvailable] = useState(false);
  const [finalResult, changeFinalResult] = useState<any[]>([]);
  const [shareLinkClicked, changeShareLinkClicked] = useState(false);
  const [shareLinkAnimatingOut, changeShareLinkAnimatingOut] = useState(false);

  const scrollFunction = (element: string, questionIndex: number) => {
    const scrollToRes = () => {
      setTimeout(() => {
        scroller.scrollTo("Result", {
          duration: 500,
          offset: -80,
          smooth: true,
          container: "main-questions-container",
        });
      }, 200)

      setTimeout(() => {
        scroller.scrollTo("Result", {
          duration: 250,
          offset: -110,
          smooth: true,
          container: "main-questions-container",
        })
      }, 700);
    };

    const scrollToEl = () => {
      scroller.scrollTo(element, {
        duration: 250,
        offset: -150,
        smooth: true,
        container: 'main-questions-container'
      });

      setTimeout(() => {
        scroller.scrollTo(element, {
          duration: 250,
          offset: -150,
          smooth: true,
          container: "main-questions-container",
        });
      }, 500)
    };

    if (quiz.quizFields.autoScroll) {
      if (
        questionIndex + 1 === quiz.quizFields.questions.length &&
        !element.includes("QuizQuestionResponse")
      ) {
        scrollToRes();
      } else {
        if(element.includes("QuizResponseResponse")) {
          setTimeout(() => {
            scrollToEl()
          }, 200)
        } else {
          scrollToEl()
        }
      }
    }
  }

  useEffect(() => {
    if (
      selectedAnswers.length > 0 &&
      selectedAnswers.length === quiz.quizFields.questions.length
    ) {
      const allAnswers = selectedAnswers.map((answer) => answer.resultID);
      const answerFreq: { [key: string]: number } = {};

      for (let i = 0; i < allAnswers.length; i++) {
        if (answerFreq[allAnswers[i]]) {
          answerFreq[allAnswers[i]]++;
        } else {
          answerFreq[allAnswers[i]] = 1;
        }
      }

      const greatestValue = Math.max(...Object.values(answerFreq));

      const mostFrequentResultID = Object.keys(answerFreq).find(
        (key) => answerFreq[key] === greatestValue
      );

      if (!resultsAvailable) {
        changeResultsAvailable(true);
        changeFinalResult(
          quiz.quizFields.results.filter(
            (result) => Number(result.resultId) === Number(mostFrequentResultID)
          )
        );
      }
    }
  }, [selectedAnswers, quiz.quizFields.questions, resultsAvailable, quiz.quizFields.results])

  if (quiz.quizFields.autoScroll) {
  }

  useEffect(() => {
    if (
      selectedAnswers.length > 0 &&
      selectedAnswers.length === convertedQuiz.questions.length
    ) {
      const allAnswers = selectedAnswers.map((answer) => answer.resultId);
      const answerFreq: { [key: string]: number } = {};

      for (let i = 0; i < allAnswers.length; i++) {
        if (answerFreq[allAnswers[i]]) {
          answerFreq[allAnswers[i]]++;
        } else {
          answerFreq[allAnswers[i]] = 1;
        }
      }

      const greatestValue = Math.max(...Object.values(answerFreq));

      const mostFrequentResultID = Object.keys(answerFreq).find(
        (key) => answerFreq[key] === greatestValue
      );

      if (!resultsAvailable) {
        changeResultsAvailable(true);
        changeFinalResult(
          convertedQuiz.results.filter(
            (result: any) => Number(result.resultId) === Number(mostFrequentResultID)
          )
        );
      }
    }
  }, [selectedAnswers, convertedQuiz.questions, resultsAvailable, convertedQuiz.results]);

  useEffect(() => {
    if (shareLinkClicked) {
      setTimeout(() => {
        changeShareLinkAnimatingOut(true);
      }, 4500);

      setTimeout(() => {
        changeShareLinkClicked(false);
        changeShareLinkAnimatingOut(false);
      }, 4800);
    }
  }, [shareLinkClicked]);

  return (
    <QuizContext.Provider
      value={{
        selectedAnswers: selectedAnswers,
        changeSelectedAnswers: changeSelectedAnswers,
        scrollFunction: scrollFunction,
      }}
    >
      <Element name="Top" className="outer-quiz-container">
        <div className="inner-quiz-container">
          {convertedQuiz.title ? <h1 className="quiz-title">{convertedQuiz.title}</h1> : null}
          {convertedQuiz.description ? (
            <p className="quiz-description">{convertedQuiz.description}</p>
          ) : null}
        </div>
      </Element>
    </QuizContext.Provider>
  );
};
