import React, { FC } from 'react';
// import { QuestionResponseProps } from '@/types';

const QuestionResponse: FC<any> = ({ questionIndex, title, description }) => {
  const visible = title || description;

  return (
    <div
      key={`QuestionResponse${questionIndex}`}
      className={`question-response-outer-container ${visible ? '' : 'hide-response-container'}`}
    >
      <div className="question-response-inner-container">
        {title ? (
          typeof title === 'string' ? (
            <h3 className="question-response-title">{title}</h3>
          ) : (
            <React.Fragment>{title}</React.Fragment>
          )
        ) : null}
        {description ? (
          typeof description === 'string' ? (
            <h4 className="question-response-description">{description}</h4>
          ) : (
            <React.Fragment>{description}</React.Fragment>
          )
        ) : null}
      </div>
    </div>
  );
};

export default QuestionResponse;
