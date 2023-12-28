import FsLightbox from "fslightbox-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import {
  HiOutlineMinusCircle,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";
import { PiPlusSquareThin } from "react-icons/pi";
import Select from "react-select";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  getAllQuiz,
  getQuizWithQA,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../services/apiservice";
import "./ManageQuestion.scss";

const ManageQuestion = (props) => {
  const [previewImage, setPreviewImage] = useState({});
  const [toggler, setToggler] = useState(false);

  const [listQuestion, setListQuestion] = useState([]);
  const [listQuiz, setListQuiz] = useState([]);

  const options =
    listQuiz &&
    listQuiz.map((quiz) => {
      return {
        value: quiz.id,
        label: `${quiz.id}-${quiz.name}`,
      };
    });
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const fetchQuizData = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      // console.log(listQuiz);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
    }
  };
  const fetchQuizWithQA = async (quizId) => {
    let res = await getQuizWithQA(quizId);
    if (res && res.EC === 0) {
      setListQuestion(res.DT.qa);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    // fetchQuizWithQA(selectedQuiz.value);
    setListQuestion([]);
    setPreviewImage({});
  }, [selectedQuiz]);
  //handle add new question
  const handleAddNewQuestion = () => {
    setListQuestion([
      ...listQuestion,
      {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [],
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
      isCorrect: false,
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
  const handleOnChange = (type, questionId, answerId, value) => {
    const cloneListQuestion = [...listQuestion];
    const targetQuestionId = questionId;
    const targetAnswerId = answerId;
    const targetQuestionIndex = cloneListQuestion.findIndex(
      (question) => question.id === targetQuestionId
    );
    switch (type) {
      case "QUESTION":
        cloneListQuestion[targetQuestionIndex].description = value;

        setListQuestion(cloneListQuestion);
        break;
      case "ANSWER":
        var targetAnswerIndex = cloneListQuestion[
          targetQuestionIndex
        ].answers.findIndex((answer) => answer.id === targetAnswerId);
        cloneListQuestion[targetQuestionIndex].answers[
          targetAnswerIndex
        ].description = value;
        setListQuestion(cloneListQuestion);
        break;
      case "CHECKBOX":
        targetAnswerIndex = cloneListQuestion[
          targetQuestionIndex
        ].answers.findIndex((answer) => answer.id === targetAnswerId);
        cloneListQuestion[targetQuestionIndex].answers[
          targetAnswerIndex
        ].isCorrect = !cloneListQuestion[targetQuestionIndex].answers[
          targetAnswerIndex
        ].isCorrect;
        setListQuestion(cloneListQuestion);
        break;
      default:
        break;
    }
  };
  const handleOnchangeFile = (e, questionId) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const cloneListQuestion = [...listQuestion];
      const index = cloneListQuestion.findIndex((q) => q.id === questionId);
      cloneListQuestion[index].imageFile = file;
      cloneListQuestion[index].imageName = file.name;
      setPreviewImage({
        imageFile: URL.createObjectURL(file),
        imageName: file.name,
      });
    }
  };
  const handleAddQA = async () => {
    //submit question:

    await Promise.all(
      listQuestion.map(async (question) => {
        const q = await postCreateNewQuestionForQuiz(
          selectedQuiz.value,
          question.description,
          question.imageFile
        );
        if (q.EC !== 0) {
          toast.error(q.EM);
         
        } else if (q.EC === 0) {
          toast.success(q.EM);
           setListQuestion([]);
        }
        //submit answer(s)
         await Promise.all(
          question.answers.map(async (answer) => {
            let a = await postCreateNewAnswerForQuestion(
              +q.DT.id,
              answer.description,
              answer.isCorrect
            );
            if (a.EC !== 0) {
              toast.error(a.EM);
              return;
            } else if (a.EC === 0) {
              toast.success(a.EM,{theme:"dark"});
            }
          })
        );

         // console.log(q)
      })
    );
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
      {selectedQuiz && listQuestion.length === 0 && (
        <div>
          <button
            onClick={() => handleAddNewQuestion()}
            className="btn btn-primary"
          >
            Create a question{" "}
          </button>
        </div>
      )}
      {!selectedQuiz &&
      <span style={{color:"orange"}}>*please select quiz</span>

      }
      {listQuestion &&
        listQuestion.length > 0 &&
        listQuestion.map((question, index) => {
          return (
            <div style={{ marginTop: "20px" }} key={`question-${index}`}>
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
                        0,
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
                    <label htmlFor="image-upload">
                      <LuImagePlus
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "cyan",
                          cursor: "pointer",
                        }}
                        className="image-upload-icon"
                      ></LuImagePlus>
                    </label>
                    {previewImage && (
                      <>
                        <span
                          onClick={() => setToggler(!toggler)}
                          className="image-text-hover"
                        >
                          {previewImage.imageName && (
                            <span>Click to view Image</span>
                          )}
                        </span>
                        <FsLightbox
                          toggler={toggler}
                          sources={[`${previewImage.imageFile}`]}
                        />
                      </>
                    )}
                    {_.isEmpty(previewImage) && <span>0 file is uploaded</span>}
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name=""
                      id="image-upload"
                      className=""
                      onChange={(e) => handleOnchangeFile(e, question.id)}
                    />
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
              {question && question.answers.length === 0 && (
                <div>
                  <button
                    style={{ marginLeft: "270px" }}
                    onClick={() => handleAddAnswer(question.id)}
                    className="btn btn-primary"
                  >
                    Add an answer
                  </button>
                </div>
              )}
              {question &&
                question.answers.map((answer, index) => {
                  return (
                    <div className="answer-container">
                      <div className="answer-add-new-wrapper ">
                        <input
                          checked={answer.isCorrect}
                          style={{ marginRight: "10px" }}
                          class="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          onChange={() =>
                            handleOnChange("CHECKBOX", question.id, answer.id)
                          }
                        />
                        <div class="form-floating mb-3 col-4 ">
                          <input
                            type="text"
                            class="form-control "
                            id="floatingInput"
                            value={answer.description}
                            onChange={(e) =>
                              handleOnChange(
                                "ANSWER",
                                question.id,
                                answer.id,
                                e.target.value
                              )
                            }
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
      <hr />
      {listQuestion.length !== 0 && (
        <div className="submit-button">
          <button
            onClick={() => handleAddQA()}
            style={{ marginLeft: "640px" }}
            className="btn btn-warning"
          >
            SAVE
          </button>
        </div>
      )}
    </div>
  );
};
export default ManageQuestion;
