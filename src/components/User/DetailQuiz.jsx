import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQquizByQuizId } from "../../services/apiservice";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const { id } = useParams();
  const[currentQuestion,setCurrentQuestion]=useState(0);
  const[listQuestion,setListQuestion]=useState([]);
  //   const[quizId,setQuizId]=useState(id);
  const location = useLocation();
  console.log(location);
  const fetchQuizData = async () => {
    let res = await getQquizByQuizId(id);
    // console.log(res)
    if (res && res.EC === 0) {
      let data_raw = res.DT;
      const data_modified = _.chain(data_raw)
        .groupBy("id")
        .map((value, key) => {
          const answers_array = [];
          value.forEach((item) => {
            answers_array.push(item.answers);
          });
          return {
            ...value[0],
            answers: answers_array,
            isSelected: false,
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
     
          < Question 
          currentQuestion={currentQuestion}
          listQuestion={listQuestion}
          setCurrentQuestion={setCurrentQuestion}
          
          />
         
        </div>
        <div className="right-content">count down</div>
      </div>
    </>
  );
};

export default DetailQuiz;
