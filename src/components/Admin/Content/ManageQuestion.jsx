import Select from "react-select";
import { useState } from "react";
import "./ManageQuestion.scss";
import { FcPlus } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { PiPlusSquareThin } from "react-icons/pi";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import _ from "lodash";
import { toast } from "react-toastify";
const ManageQuestion = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [listQuestion, setListQuestion] = useState([
    {
      id: uuidv4(),
      description: "Question 1: What is the capital of France?",
      imageFile: "image1.jpg",
      imageName: "Paris",
      answers: [
        {
          id: uuidv4(),
          description: "Paris",
          isCorrected: true,
        },
        {
          id: uuidv4(),
          description: "London",
          isCorrected: false,
        },
        {
          id: uuidv4(),
          description: "Berlin",
          isCorrected: false,
        },
        {
          id: uuidv4(),
          description: "Madrid",
          isCorrected: false,
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Question 2: Who wrote 'Romeo and Juliet'?",
      imageFile: "image2.jpg",
      imageName: "Shakespeare",
      answers: [
        {
          id: uuidv4(),
          description: "Shakespeare",
          isCorrected: true,
        },
        {
          id: uuidv4(),
          description: "Hemingway",
          isCorrected: false,
        },
        {
          id: uuidv4(),
          description: "Tolstoy",
          isCorrected: false,
        },
        {
          id: uuidv4(),
          description: "Dickens",
          isCorrected: false,
        },
      ],
    },
  ]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  //handle add new question
  const handleAddNewQuestion = () => {
    setListQuestion([
      ...listQuestion,
      {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "answer 1",
            isCorrected: false,
          },
          {
            id: uuidv4(),
            description: "answer 2",
            isCorrected: false,
          },
        ],
      },
    ]);
  };
  const handleDeleteQuestion = (id) => {
    if (listQuestion.length === 1) {
      toast.error("Can not delete the only 1 question", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const newListQuestion = listQuestion.filter((question) => {
      return question.id !== id;
    });
    console.log(newListQuestion);
    setListQuestion(newListQuestion);
  };
  const handleAddAnswer = (questionId) => {
    const newListQuestion = [...listQuestion];
    const index = newListQuestion.findIndex((question) => {
      return question.id === questionId;
    });
    newListQuestion[index].answers.push({
      id: uuidv4(),
      description: "",
      isCorrected: false,
    });
    setListQuestion(newListQuestion);
  };
  const handleDeleteAnswer = (questionId, answerId) => {
    const cloneListQuestion = [...listQuestion];
    const Qindex = cloneListQuestion.findIndex((question) => {
      return question.id === questionId;
    });
    if (listQuestion[Qindex].answers.length === 1) {
      toast.error("Can not delete the only 1 answer", {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
      return;
    }
    const newListAnswer = cloneListQuestion[Qindex].answers.filter((a) => {
      return a.id !== answerId;
    });
    cloneListQuestion[Qindex].answers = newListAnswer;
    setListQuestion(cloneListQuestion);
  };
  //handle onchange
  const handleOnChange = (type,questionId ,answerId, value) => {
    const cloneListQuestion = [...listQuestion];
 const targetQuestionId = questionId;
  const targetQuestionIndex = cloneListQuestion.findIndex(
          (question) => question.id === targetQuestionId
        );
    switch (type) {
      case "QUESTION":
       
        cloneListQuestion[targetQuestionIndex].description = value;
        setListQuestion(cloneListQuestion);
        break;
       case "ANSWER":
          const targetAnswerId=answerId;
          cloneListQuestion[targetQuestionIndex].answers[ta]
       break;
      default:
        break;
    }
  };
  return (
    <div className="manage-question-container">
      <div className="title">Manage Question</div>
      <div className="manage-question-add-new col-6 ">
        <label className="form-label">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          options={options}
          onChange={setSelectedQuiz}
          className="select-quiz"
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <span>Add question:</span>
      </div>
      {listQuestion &&
        listQuestion.length > 0 &&
        listQuestion.map((question, index) => {
          return (
            <div style={{ marginTop: "20px" }} key={question.id}>
              <div className="form-add-new-wrapper col-6">
                <HiOutlineQuestionMarkCircle
                  className="icon-question"
                  style={{
                    color: "orange",
                    width: "30px",
                    height: "30px",
                    margin: "0 10px",
                  }}
                />
                <div class="form-floating mb-3 col-6 ">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    value={question.description}
                    onChange={(e) => {
                      return handleOnChange(
                        "QUESTION",
                        question.id,
                        e.target.value
                      );
                    }}
                  />
                  <label style={{ color: "#ccc" }} for="floatingInput">
                    Question {index}'s Description
                  </label>
                </div>
                <div className="icon-wrapper">
                  <div className="question-image-upload">
                    {/* <label htmlFor="">Upload Image:</label> */}
                    <input type="file" name="" id="" className="form-control" />
                  </div>
                  <span
                    className="icon-container"
                    style={{ display: "flex", gap: "10px", marginLeft: "20px" }}
                  >
                    <span>
                      <FcPlus
                        className="icon"
                        style={{ height: "30px", width: "30px" }}
                        onClick={() => handleAddNewQuestion()}
                      />
                    </span>
                    <span>
                      <FaTrash
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="icon"
                        style={{ height: "30px", width: "30px", color: "red" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
              {question &&
                question.answers.map((answer, index) => {
                  return (
                    <div className="answer-container">
                      <div className="answer-add-new-wrapper ">
                        <input
                          style={{ marginRight: "10px" }}
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <div class="form-floating mb-3 col-4 ">
                          <input
                            type="text"
                            class="form-control "
                            id="floatingInput"
                            value={answer.description}
                            onChange={(e)=>handleOnChange("ANSWER",question.id,answer.id,e.target.value)}
                          />
                          <label style={{ color: "#ccc" }} for="floatingInput">
                            Answer {index}
                          </label>
                        </div>
                        <span
                          className="icon-container"
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginLeft: "20px",
                          }}
                        >
                          <span>
                            <PiPlusSquareThin
                              className="icon"
                              style={{
                                height: "30px",
                                width: "30px",
                                color: "green",
                              }}
                              onClick={() => handleAddAnswer(question.id)}
                            />
                          </span>
                          <span>
                            <HiOutlineMinusCircle
                              className="icon"
                              style={{
                                height: "30px",
                                width: "30px",
                                color: "red",
                              }}
                              onClick={() =>
                                handleDeleteAnswer(question.id, answer.id)
                              }
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
export default ManageQuestion;
