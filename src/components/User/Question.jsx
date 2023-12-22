import { useState } from "react";
const Question = (props) => {
  const { currentQuestion, setCurrentQuestion } = props;
  const { listQuestion } = props;

  const answerOptions = ["A", "B", "C"];

  const handleClickCheckBox = (e) => {
    // handle checkbox click logic here
    console.log(e.target.checked);
  };

  return (
    <div className="quiz-content">
      <div className="question d-flex justify-content-center">
        {listQuestion && `${listQuestion[currentQuestion]?.description}?`}
      </div>
      <div className="image d-flex justify-content-center">
        {listQuestion[currentQuestion]?.image ? (
          <img
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
        {answerOptions.map((option, index) => (
          <div className="answer-select" key={index}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={(e) => handleClickCheckBox(e)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {`${option}. ${listQuestion[currentQuestion]?.answers[index]?.description}`}
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
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

        {currentQuestion !== listQuestion.length - 1 && (
          <button
            onClick={() => {
              if (currentQuestion < listQuestion.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              }
            }}
            className="btn btn-primary"
          >
            NEXT
          </button>
        )}
        <button className="btn btn-warning mx-3">SUBMIT</button>
      </div>
    </div>
  );
};

export default Question;
