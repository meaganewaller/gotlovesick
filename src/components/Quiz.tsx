'use client';

import React, { useState, useEffect, FC, createContext, Dispatch } from 'react';
import Question from './Question';
import Result from './Result';
import '@/styles/quizzes.css';
import { convertWPQuizToIQuiz } from '@/services/graphql';

interface ContextProps {
  selectedAnswers: any[]
  changeSelectedAnswers: Dispatch<React.SetStateAction<any[]>>;
}

export const QuizContext = createContext<ContextProps>({
  selectedAnswers: [{ questionIndex: 0, resultId: 0, answerIndex: 0 }],
  changeSelectedAnswers: () => [],
});

export const Quiz: FC<{ quiz: any }> = (props) => {
  const {
    quiz
  } = props;

  const convertedQuiz = convertWPQuizToIQuiz(quiz)

  const [selectedAnswers, changeSelectedAnswers] = useState<any[]>(
    []
  );

  const [resultsAvailable, changeResultsAvailable] = useState(false);
  const [finalResult, changeFinalResult] = useState<any[]>([]);
  const [shareLinkClicked, changeShareLinkClicked] = useState(false);
  const [shareLinkAnimatingOut, changeShareLinkAnimatingOut] = useState(false);

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
            (result) => Number(result.resultId) === Number(mostFrequentResultID)
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
      }}
    >
      <div className="outer-quiz-container">
        <div className="inner-quiz-container">
          {convertedQuiz.title ? <h1 className="quiz-title">{convertedQuiz.title}</h1> : null}
          {convertedQuiz.description ? (
            <p className="quiz-description">{convertedQuiz.description}</p>
          ) : null}

          {convertedQuiz.questions ? (
            Array.isArray(convertedQuiz.questions) && convertedQuiz.questions.length > 0 ? (
              <>
                <ol
                  id="main-questions-container"
                  className="question-list-container"
                >
                  {convertedQuiz.questions.map((item: any, index: number) => (
                    <Question
                      key={index}
                      item={item}
                      questionIndex={index}
                      resultsAvailable={resultsAvailable}
                      onAnswerSelection={convertedQuiz.onAnswerSelection}
                    />
                  ))}
                </ol>
                {console.log(finalResult)}
                <Result
                  title={convertedQuiz.title}
                  resultsAvailable={resultsAvailable}
                  finalResult={finalResult}
                  copyShareButton={convertedQuiz.copyShareButton}
                  copyShareLink={convertedQuiz.copyShareLink}
                  shareLinkClicked={shareLinkClicked}
                  changeShareLinkClicked={changeShareLinkClicked}
                  shareLinkAnimatingOut={shareLinkAnimatingOut}
                  changeShareLinkAnimatingOut={changeShareLinkAnimatingOut}
                  changeResultsAvailable={changeResultsAvailable}
                  changeSelectedAnswers={changeSelectedAnswers}
                  changeFinalResult={changeFinalResult}
                  onResult={convertedQuiz.onResult}
                  onRestart={convertedQuiz.onRestart}
                />
              </>
            ) : null
          ) : null}
        </div>
      </div>
    </QuizContext.Provider>
  );
};
