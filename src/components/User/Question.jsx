import { useState } from "react";
const Question = (props) => {
  const { currentQuestion, setCurrentQuestion } = props;
  const { listQuestion } = props;
//   console.log(listQuestion,listQuestion.length);
  const { updateIsSelectd } = props;
  const handleClickCheckBox = (e, answerId, questionId) => {
    updateIsSelectd(questionId, answerId);
  };
  const getAnswerLabel = (index) => {
    return String.fromCharCode(65 + index);
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
        {listQuestion[currentQuestion]?.answers.map((answer, index) => {
            const questionId=listQuestion[currentQuestion]?.id;
         return(
            <div className="answer-select" key={index}>
            <div className="form-check">
              <input
                checked={answer.isSelected}
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheckDefault${index}`}
                onChange={(e) => handleClickCheckBox(e,answer.id,questionId)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {`${getAnswerLabel(index)}.${answer.description}`}
              </label>
            </div>
          </div>
         )
        })}
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
        <button onClick={()=>{props.submitAnswer()}} className="btn btn-warning mx-3">SUBMIT</button>
      </div>
    </div>
  );
};
export default Question;
