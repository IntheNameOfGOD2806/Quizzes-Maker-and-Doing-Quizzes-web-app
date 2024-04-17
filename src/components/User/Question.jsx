import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
const Question = (props) => {
  //ngai sua vl:))))
  const { currentQuestion, setCurrentQuestion,showAnswer,setShowAnswer } = props;
  //
  const { listQuestion } = props;
  const [previewImage, setPreviewImage] = useState(false);

  //   console.log(listQuestion,listQuestion.length);
  const { updateIsSelectd } = props;
  const handleClickCheckBox = (e, answerId, questionId) => {
    updateIsSelectd(questionId, answerId);
  };
  const getAnswerLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <>
      <div className="quiz-content">
        <div className="question d-flex justify-content-center">
          {listQuestion && `${listQuestion[currentQuestion]?.description}?`}
        </div>
        <div className="image d-flex justify-content-center">
          {listQuestion[currentQuestion]?.image ? (
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setPreviewImage(true)}
              className=""
              src={`data:image/png;base64,${listQuestion[currentQuestion]?.image}`}
              alt=""
            />
          ) : (
            <span className="text-danger">
              This Question Doesn't Have Any Images
            </span>
          )}
        </div>
        <div className="answer">
          {listQuestion[currentQuestion]?.answers.map((answer, index) => {
            const questionId = listQuestion[currentQuestion]?.id;
            return (
              <div className="answer-select" key={index}>
                <div className="form-check">
                  <input
                    checked={answer.isSelected}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={`flexCheckDefault${index}`}
                    onChange={(e) =>
                      handleClickCheckBox(e, answer.id, questionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {`${getAnswerLabel(index)}.${answer.description}`}
                    {answer && answer.isCorrect && showAnswer && <><IoMdCheckmark style={{color:"green",marginLeft:"13px"}} /></>}
                    {!answer.isCorrect && answer.isSelected && showAnswer && <><FaXmark style={{color:"red"}}/></>}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{marginBottom:"10px"}} className="footer">
          {currentQuestion !== 0 && (
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
              className="btn btn-secondary mx-3"
            >
              PREV
            </button>
          )}
          {currentQuestion <= props.listQuestion.length - 2 && (
            <button
              onClick={() => {
                if (currentQuestion <= props.listQuestion.length - 2) {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
              className="btn btn-primary"
            >
              NEXT
            </button>
          )}
          <button
            onClick={() => {
              props.submitAnswer();
            }}
            className="btn btn-warning mx-3"
          >
            SUBMIT
          </button>
        </div>
      </div>
      <Lightbox
        open={previewImage}
        close={() => setPreviewImage(false)}
        slides={[
          {
            src: `data:image/png;base64,${listQuestion[currentQuestion]?.image}`,
          },
        ]}
      />
    </>
  );
};
export default Question;
