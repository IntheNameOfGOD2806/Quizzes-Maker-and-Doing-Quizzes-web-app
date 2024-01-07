import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQquizByQuizId, postSubmitQuiz } from "../../services/apiservice";
import "./DetailQuiz.scss";
import ModalResult from "./ModalResult";
import Question from "./Question";
import RightContent from "./content/RightContent";
const DetailQuiz = (props) => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [listQuestion, setListQuestion] = useState([]);
  const [showModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  //   console.log(listQuestion);
  const location = useLocation();
  const submitAnswer = async () => {
    const dataSubmit = {
      quizId: id,
      answers: listQuestion.map((item) => {
        return {
          questionId: item.id,
          userAnswerId: item.answers
            .filter((answer) => answer.isSelected)
            .map((answer) => answer.id),
        };
      }),
    };
    // console.log(JSON.stringify(dataSubmit));
    let res = await postSubmitQuiz(dataSubmit);
    if (res && res.EC === 0) {
      console.log("check system asnw", res.DT.quizData);
      const cloneListQuestion = _.cloneDeep(listQuestion);
      console.log(cloneListQuestion);
      for (let i = 0; i < res.DT.quizData.length; i++) {
        const questionID = res.DT.quizData[i].questionId;
        const listCorrectAnswerId = [];
        for (let j = 0; j < res.DT.quizData[i].systemAnswers.length; j++) {
          if (res.DT.quizData[i].systemAnswers[j]) {
            listCorrectAnswerId.push(res.DT.quizData[i].systemAnswers[j].id);
            for (let k = 0; k < listCorrectAnswerId.length; k++) {
              const index = cloneListQuestion[
                cloneListQuestion.findIndex((q) => q.id === questionID)
              ].answers.findIndex((a) => a.id === listCorrectAnswerId[k]);
              cloneListQuestion[
                cloneListQuestion.findIndex((q) => q.id === questionID)
              ].answers[index].isCorrect = true;
            }
          }
          console.log(listCorrectAnswerId)
        }
        // cloneListQuestion.findIndex(q=>q.)
      }
      console.log(cloneListQuestion);
      setListQuestion(cloneListQuestion)
      setShowModalResult(true);
      setDataModalResult(res.DT);
    }
  };
  const updateIsSelectd = (questionId, answerId) => {
    const selectedQuestion = [...listQuestion].find((question) => {
      return question.id === questionId;
    });
    const toChangeQuestion = selectedQuestion.answers.find((answer) => {
      return answer.id === answerId;
    });
    toChangeQuestion.isSelected = !toChangeQuestion.isSelected;
    const cloneListQuestion = _.cloneDeep(listQuestion);
    var index = cloneListQuestion.findIndex((x) => x.id === questionId);
    cloneListQuestion[index] = selectedQuestion;
    setListQuestion(cloneListQuestion);
    // console.log(selectedAnswer);
    // setListQuestion([...listQuestion, selectedAnswer]);
    // console.log(listQuestion);
  };
  //   console.log(location);
  const fetchQuizData = async () => {
    let res = await getQquizByQuizId(id);
    // console.log(res)
    if (res && res.EC === 0) {
      let data_raw = res.DT;
      // console.log(data_raw)
      const data_modified = _.chain(data_raw)
        .groupBy("id")
        .map((value, key) => {
          const answers_array = [];
          value.forEach((item) => {
            //flag
            item.answers.isSelected = false;
            answers_array.push(item.answers);
          });
          return {
            ...value[0],
            answers: _.orderBy(answers_array, ["id"], ["asc"]),
          };
        })
        .value();
      //   console.log(data_modified);
      setListQuestion(data_modified);
    }
  };
  useEffect(() => {
    fetchQuizData();
  }, [id]);
  return (
    <>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            <span>Quiz {id}:</span> <span>{location?.state?.description}</span>
          </div>

          <div className="quiz-body">
            <img src="" alt="" />
          </div>
          <Question
            showAnswer={showAnswer}
           
            currentQuestion={currentQuestion}
            listQuestion={listQuestion}
            setCurrentQuestion={setCurrentQuestion}
            updateIsSelectd={updateIsSelectd}
            submitAnswer={submitAnswer}
          />
          <ModalResult
            setShowAnswer={setShowAnswer}

            show={showModalResult}
            setShow={setShowModalResult}
            dataModalResult={dataModalResult}
          />
          {/* <div onClick={()=>{setShowModalResult(true)}} className="btn btn-danger">show modal test</div> */}
        </div>
        <div className="right-content">
          <RightContent
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            listQuestion={listQuestion}
            submitAnswer={submitAnswer}
          />
        </div>
      </div>
    </>
  );
};
export default DetailQuiz;
