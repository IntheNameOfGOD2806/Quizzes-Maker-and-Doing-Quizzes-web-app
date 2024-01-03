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
import { Slide, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  getAllQuiz,
  getQuizWithQA,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  postUpSertQA,
} from "../../../services/apiservice";
import "./ManageQuestion.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setPreviewState } from "../../../redux/action/previewAction";
const UpdateQA = (props) => {
  const [previewImage, setPreviewImage] = useState([]);
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
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }
  const previewStateRedux= useSelector(state=>state.preview).filter(element => element !== null)
  // console.log(previewStateRedux)
  const fetchQuizWithQA = async (quizId) => {
    let res = await getQuizWithQA(quizId);
    const raw_qa_data = res.DT.qa;
    if (res && res.EC === 0) {
      for (let i = 0; i < raw_qa_data.length; i++) {
        const id=raw_qa_data[i].id
        const index=previewStateRedux.findIndex(q=>q?.id===id)
        // console.log(index)

        raw_qa_data[i].isShow =index!==-1?previewStateRedux[index].value:false;
        if (raw_qa_data[i].imageFile) {
          //convert base64 to file object
          raw_qa_data[i].imageFile = await urltoFile(
            `data:image/png;base64,${raw_qa_data[i].imageFile}`,
            `question-${raw_qa_data[i].id}.png`,
            "image/png"
          );
          // console.log(URL.createObjectURL(raw_qa_data[i].imageFile));
        }
      }
      // console.log(raw_qa_data);
      setListQuestion(raw_qa_data);
    }
  };
 
  useEffect(() => {
    fetchQuizData();
  }, []);
  useEffect(() => {
    fetchQuizWithQA(selectedQuiz.value);
  }, [selectedQuiz]);
  useEffect(() => {
    localStorage.setItem('previewimage', JSON.stringify(previewImage));
  }, [previewImage]);
  const handleAddNewQuestion = async () => {
    setListQuestion([
      ...listQuestion,
      {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        isValid: true,
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
    // console.log(newListQuestion);
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
      isValid: true,
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
    // console.log(questionId)
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
        //
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
  const handleOnchangeFile = (e, questionId, index) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const cloneListQuestion = [...listQuestion];
      const Qindex = cloneListQuestion.findIndex((q) => q.id === questionId);
      cloneListQuestion[Qindex].imageFile = file;
      cloneListQuestion[Qindex].imageName = file.name;
      setListQuestion(cloneListQuestion);
    }
  };
  // const getImageIndexByImageID = (questionId) => {
  //   const clonePreviewImage = [...previewImage];
  //   const index = clonePreviewImage.findIndex((img) => img.id === questionId);
  //   return index;
  // };
  const dispatch = useDispatch();
  const handleShowImagePreview = (questionId) => {
    const previewImageClone=[...previewImage];
    const cloneListQuestion = [...listQuestion];
    // console.log(cloneListQuestion);
    const index = cloneListQuestion.findIndex((q) => q.id === questionId);
    if (cloneListQuestion[index].imageFile) {

      cloneListQuestion[index].isShow = ! cloneListQuestion[index].isShow;
      //store previous state of preview image
   dispatch(setPreviewState({
    id: questionId,
    value: cloneListQuestion[index].isShow,
  }))
     
     
    }
    setListQuestion(cloneListQuestion);
  };
  const handleCloseLightBox = (questionId) => {
    const cloneListQuestion = [...listQuestion];
    const index = cloneListQuestion.findIndex((q) => q.id === questionId);
    cloneListQuestion[index].isShow =false;
    setListQuestion(cloneListQuestion);
  };
  const handleUpdateQA = async () => {
    // await Promise.all(
    //   listQuestion.map(async (question) => {
    //     const q = await postCreateNewQuestionForQuiz(
    //       selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );
    //     if (q.EC !== 0) {
    //       toast.error(q.EM);
    //     } else if (q.EC === 0) {
    //       toast.success(q.EM);
    //       setListQuestion([]);
    //     }
    //     //submit answer(s)
    //     await Promise.all(
    //       question.answers.map(async (answer) => {
    //         let a = await postCreateNewAnswerForQuestion(
    //           +q.DT.id,
    //           answer.description,
    //           answer.isCorrect
    //         );
    //         if (a.EC !== 0) {
    //           toast.error(a.EM);
    //           return;
    //         } else if (a.EC === 0) {
    //           toast.success(a.EM, { theme: "dark" });
    //         }
    //       })
    //     );
    //     // console.log(q)
    //   })
    // );
    //validate data
    let checkValidate = false;
    listQuestion.forEach((question, index) => {
      if (_.isEmpty(question.answers)) {
        toast.warning(`question ${index} not have any answer`);
        checkValidate = false;
        return;
      }
      if (_.isEmpty(question.description)) {
        toast.warn(`question ${index} description is empty`, {
          transition: Slide,
        });
      } else {
        checkValidate = true;
      }
      for (const answerIndex in question.answers) {
        if (_.isEmpty(question.answers[answerIndex].description)) {
          toast.warn(
            `answer ${answerIndex} of question ${index}  cannot be empty`
          );
          checkValidate = false;
        } else {
          checkValidate = true;
        }
      }
      console.log(checkValidate);
    });
    //call api
    if (checkValidate) {
      console.log("check list", listQuestion);
      //add new question and answer avoiding uuid() bug
      for (const question of listQuestion) {
        // console.log(typeof(question.id))
        if (typeof question.id !== "number") {
          var q = await postCreateNewQuestionForQuiz(
            selectedQuiz.value,
            question.description,
            question.imageFile
          );
          if (q.EC !== 0) {
            toast.error(q.EM);
          } else if (q.EC === 0) {
            toast.success(q.EM);
          }
          console.log("checck q:", q);
        }
        //submit answer
        for (const answer of question.answers) {
          if (typeof answer.id !== "number") {
            const a = await postCreateNewAnswerForQuestion(
              typeof question.id !== "number" ? q.DT.id : question.id,
              answer.description,
              answer.isCorrect
            );
            if (a.EC !== 0) {
              toast.error(a.EM, { theme: "dark" });
              return;
            } else if (a.EC === 0) {
              toast.success(a.EM, { theme: "dark" });
            }
          }
        }
      }
      const cloneListQuestion = [...listQuestion];
      const data = {
        quizId: selectedQuiz.value,
        questions: await Promise.all(
          cloneListQuestion.map(async (question) => {
            const base64TextFile = question.imageFile
              ? await toBase64(question.imageFile)
              : "";
            console.log(base64TextFile);
            return {
              id: question.id,
              description: question.description,
              imageFile: question.imageFile ? `${base64TextFile}` : "",
              imageName: question.imageName,
              answers: question.answers.map((answer) => {
                return {
                  id: answer.id,
                  description: answer.description,
                  isCorrect: answer.isCorrect,
                };
              }),
            };
          })
        ),
      };
      console.log(data);
      let res = await postUpSertQA(data);
      if (res && res.EC === 0) {
        console.log(res);
        toast.success(res.EM);
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
      }
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  return (
    <>
      <div className="manage-question-container">
        <div className="manage-question-add-new col-6 ">
          <label className="form-label">Select Quiz:</label>
          <Select
            //  styles={{zIndex:"9999"}}
            defaultValue={selectedQuiz}
            options={options}
            onChange={setSelectedQuiz}
            className="select-quiz"
          />
        </div>
        <div style={{ marginTop: "30px" }}>
          <span>Update question:</span>
        </div>
        {selectedQuiz && listQuestion.length === 0 && (
          <div>
            <span style={{ color: "red" }}>
              this quiz has no question/answer
            </span>
          </div>
        )}
        {!selectedQuiz && (
          <span style={{ color: "orange" }}>*please select quiz</span>
        )}
        {listQuestion &&
          listQuestion.length > 0 &&
          listQuestion.map((question, Qindex) => {
            return (
              <div style={{ marginTop: "20px" }} key={`question-${Qindex}`}>
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
                      Question {Qindex}'s Description
                    </label>
                  </div>
                  <div className="icon-wrapper">
                    <div className="question-image-upload">
                      <label htmlFor={`image-upload${Qindex}`}>
                        <LuImagePlus
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "violet",
                            cursor: "pointer",
                          }}
                          className="image-upload-icon"
                          id="icon-up"
                        ></LuImagePlus>
                      </label>
                      {question.imageFile && (
                        <>
                          <span
                            onClick={() => {
                               handleShowImagePreview(question.id);
                            }}
                            className="image-text-hover"
                          >
                            <span className="image-preview-span">
                              view image
                            </span>
                          </span>
                          <FsLightbox
                          
                          // onShow={() => {
                          //   handleShowImagePreview(question.id);
                          // }}
                            toggler={question.isShow}
                            sources={[
                              `
                              ${URL.createObjectURL(question.imageFile)}`,
                            ]}
                            key={question.id}
                            // onClose={() => {
                            //   handleCloseLightBox(question.id);
                            // }}
                          />
                        </>
                      )}
                      {!question.imageFile && <span>0 file is uploaded</span>}
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name=""
                        id={`image-upload${Qindex}`}
                        className=""
                        onChange={(e) =>
                          handleOnchangeFile(e, question.id, Qindex)
                        }
                      />
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
                          style={{
                            height: "30px",
                            width: "30px",
                            color: "red",
                          }}
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
                      <div className="answer-container" key={`answer${index}`}>
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
                            <label
                              style={{ color: "#ccc" }}
                              for="floatingInput"
                            >
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
              onClick={() => handleUpdateQA()}
              style={{ marginLeft: "640px" }}
              className="btn btn-warning"
            >
              SAVE
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default UpdateQA;
