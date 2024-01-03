import { useState } from "react";
import "./RightContent.scss";
import FsLightbox from "fslightbox-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CountDown from "./CountDown";
const RightContent = (props) => {
  const { currentQuestion, setCurrentQuestion, listQuestion } = props;
  const leng = listQuestion.length;
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const { submitAnswer } = props;
  const handleClickSelectedQuestion = (index) => {
    setCurrentQuestion(index);
  };
  const getCLassQuestion = (question, index) => {
    if (question && question.answers.length > 0) {
      const isAnswered = question.answers.some(
        (answer) => answer.isSelected === true
      );
      if (isAnswered) {
        return "answered";
      }
    }
    
  };
  return (
    <>
      <div className="container">
        <div className="timer-container">
          <CountDown submitAnswer={submitAnswer} />
        </div>
        <hr />
        <div className="question-round">
          {listQuestion &&
            leng > 0 &&
            listQuestion.map((question, index) => {
              return (
                <>
                  <div
                    key={index}
                    onClick={() => {
                      handleClickSelectedQuestion(index);
                    }}
                    className={`${
                      index !== currentQuestion
                        ? "question-round-btn"
                        : "question-round-btn selected"
                    } ${
                      getCLassQuestion(question, index)
                        ? "answered"
                        : "not-answered"
                    }`}
                  >
                    {index}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default RightContent;
