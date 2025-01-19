import { FC, useMemo } from 'react';
// import { ResultProps } from '@/types';
import CopyLinkButton from './CopyLinkButton';
import Image from 'next/image';

const Result: FC<any> = (props) => {
  const {
    title,
    resultsAvailable,
    finalResult,
    copyShareButton,
    copyShareLink,
    shareLinkClicked,
    changeShareLinkClicked,
    shareLinkAnimatingOut,
    changeShareLinkAnimatingOut,
    changeResultsAvailable,
    changeSelectedAnswers,
    changeFinalResult,
    onResult,
    onRestart,
  } = props;

  const handleRetakeQuiz = () => {
    changeResultsAvailable(false);
    changeSelectedAnswers([]);
    changeFinalResult([]);

    if (shareLinkClicked) {
      changeShareLinkClicked(false);
    }

    if (shareLinkAnimatingOut) {
      changeShareLinkAnimatingOut(false);
    }

    if (onRestart) {
      if (typeof onRestart === 'function') {
        onRestart();
      }
    }
  };

  useMemo(() => {
    const generalOnResultFunction = () => {
      if (onResult) {
        if (typeof onResult === 'function') {
          onResult();
        }
      }
    };

    if (resultsAvailable && finalResult.length > 0) {
      if (finalResult[0].onResult) {
        if (typeof finalResult[0].onResult === 'function') {
          finalResult[0].onResult();
        } else {
          generalOnResultFunction();
        }
      } else {
        generalOnResultFunction();
      }
    }
  }, [resultsAvailable, finalResult, onResult]);

  if (resultsAvailable && finalResult.length > 0) {
    return (
      <div className="result-outer-container">
        <div className="result-header">
          <h2>{title}</h2>
        </div>

        <div className="result-inner-container">
          <div className="result-inner-description-container">
            <h3 className="result-inner-description-header">
              {finalResult[0].title}
            </h3>
            <p className="result-inner-description">
              {finalResult[0].description}
            </p>
          </div>
          {finalResult[0].resultImageSrc && (
            <div className="result-inner-image-container">
              <Image
                className="result-inner-image"
                alt="Buzzfeed Quiz Result Image"
                src={finalResult[0].resultImageSrc.node.sourceUrl}
                width={250}
                height={250}
              />
              {finalResult[0].imageAttribution ? (
                <span className="result-attribution-text">
                  {finalResult[0].imageAttribution}
                </span>
              ) : null}
            </div>
          )}
        </div>
        <div className="result-footer">
          <button className="retake-quiz-button" onClick={handleRetakeQuiz}>
            Retake
          </button>
          <ul className="share-links-list" aria-label="share">
            {copyShareButton && (
              <CopyLinkButton
                shareLinkClicked={shareLinkClicked}
                changeShareLinkClicked={changeShareLinkClicked}
                shareLinkAnimatingOut={shareLinkAnimatingOut}
                copyShareLink={copyShareLink}
              />
            )}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Result;
