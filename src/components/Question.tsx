'use client';
import { JSX, useState, FC } from 'react';
// import { QuestionProps, QuizQuestion } from '@/types';
import Answers from '@/components/Answers';
import QuestionResponse from './QuestionResponse';

const Question: FC<any> = ({
  item,
  questionIndex,
  resultsAvailable,
  onAnswerSelection,
}) => {
  const [selectedAnswerResponse, changeSelectedAnswerResponse] = useState<{
    title?: string | JSX.Element;
    description?: string | JSX.Element;
    image?: string;
    imageAttribution?: string;
  }>({
    title: '',
    description: '',
    image: '',
    imageAttribution: '',
  });

  const renderOverlapText = (item: any) => {
    if (item.questionRelativeToImage !== 'adjacent') {
      return (
        <div className="question-overlap-text">
          {item.question ? item.question : null}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={`list-item-container question ${questionIndex === 0 ? 'first-question' : ''}`}
      key={`Question${questionIndex}`}
    >
      {item.questionRelativeToImage === 'adjacent' && (
        <h2 className="question-adjacent-text">
          {item.question ? item.question : null}
        </h2>
      )}
      <div
        className={`question-inner-container ${item.questionRelativeToImage === 'adjacent' ? 'question-adjacent-to-image' : ''}`}
      >
        {renderOverlapText(item)}
      </div>

      {item.answers &&
        (Array.isArray(item.answers) && item.answers.length > 0 ? (
          <>
            <Answers
              item={item}
              questionIndex={questionIndex}
              resultsAvailable={resultsAvailable}
              onAnswerSelection={onAnswerSelection}
              changeSelectedAnswerResponse={changeSelectedAnswerResponse}
            />
            <QuestionResponse
              questionIndex={questionIndex}
              title={selectedAnswerResponse.title}
              description={selectedAnswerResponse.description}
            />
          </>
        ) : null)}
    </div>
  );
};

export default Question;
