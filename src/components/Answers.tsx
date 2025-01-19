'use client';
import { FC, useContext } from 'react';
import { AnswersProps } from '@/types';
import { QuizContext } from './Quiz';

const Answers: FC<AnswersProps> = ({
  item,
  questionIndex,
  resultsAvailable,
  onAnswerSelection,
  changeSelectedAnswerResponse,
}) => {
  const { selectedAnswers, changeSelectedAnswers } = useContext(QuizContext);

  const handleAnswerSelection = (
    questionIndex: number,
    answerIndex: number,
    resultId: number,
    showResponse: boolean,
    specificHandleAnswerSelection?: (
      questionIndex: number,
      answerIndex: number,
      resultId: number
    ) => void
  ) => {
    const handleGeneralAnswerSelection = () => {
      if (onAnswerSelection) {
        if (typeof onAnswerSelection === 'function') {
          onAnswerSelection(questionIndex, answerIndex, resultId);
        }
      }
    };

    if (specificHandleAnswerSelection) {
      if (typeof specificHandleAnswerSelection === 'function') {
        specificHandleAnswerSelection(questionIndex, answerIndex, resultId);
      } else {
        handleGeneralAnswerSelection();
      }
    } else {
      handleGeneralAnswerSelection();
    }

    if (selectedAnswers.some((item) => item.questionIndex === questionIndex)) {
      const arrCopy = selectedAnswers.slice();

      arrCopy.splice(
        arrCopy.findIndex((item) => item.questionIndex === questionIndex),
        1,
        { questionIndex, answerIndex, resultId }
      );

      changeSelectedAnswers(arrCopy);
    } else {
      changeSelectedAnswers([
        ...selectedAnswers,
        { questionIndex, answerIndex, resultId },
      ]);
    }
  };

  const gridLayout =
    item.answers.length >= 9 ||
    (item.answers.length % 3 === 0 && item.answers.length % 2 !== 0);

  return (
    <div
      className={`answers-container ${item.answerArrangement === 'row' ? 'answer-row-arrangement' : ''} ${item.answers.length >= 9 ? 'more-than-9-answers' : ''} ${item.answers.length === 3 ? 'three-answers' : ''}`}
    >
      {item.answers.map((answerEl, answerIndex) => {
        const questionAnswered = selectedAnswers.some(
          (el) => el.questionIndex === questionIndex
        );

        const answerSelected = selectedAnswers.some(
          (el) =>
            el.questionIndex === questionIndex && el.answerIndex === answerIndex
        );

        return (
          <div
            className={`individual-answer-outer-container ${resultsAvailable ? 'results-available' : ''} ${item.answerArrangement === 'row' ? 'answer-row-arrangement' : ''} ${questionAnswered ? 'question-answered' : ''} ${answerSelected ? 'answer-selected' : ''}`}
            key={answerIndex}
            onClick={() => {
              changeSelectedAnswerResponse({ title: '', description: '' });
              const revealRes = answerEl.revealResponse;
              let showResponse = false;

              if (revealRes && (revealRes.title || revealRes.description)) {
                showResponse = true;
                changeSelectedAnswerResponse(revealRes);
              }

              handleAnswerSelection(
                questionIndex,
                answerIndex,
                answerEl.resultId,
                showResponse,
                answerEl.onAnswerSelection
              );
            }}
          >
            <div
              className={`individual-answer-container ${item.answerArrangement === 'row' ? 'answer-row-arrangement' : ''} ${questionAnswered ? 'question-answered' : ''} ${answerSelected ? 'answer-selected' : ''} ${resultsAvailable ? 'results-available' : ''} ${gridLayout ? 'answer-grid-layout' : ''}`}
            >
              {item.answerArrangement === 'row' ? (
                <p className="answer-text">{answerEl.answer}</p>
              ) : null}

              {item.answerArrangement === 'row' ? (
                <p className="answer-text">{answerEl.answer}</p>
              ) : (
                <div
                  className={`text-fit ${resultsAvailable ? 'results-available' : ''} ${questionAnswered ? 'question-answered' : ''} ${answerSelected ? 'answer-selected' : ''}`}
                >
                  <div className="answer-text">{answerEl.answer}</div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
