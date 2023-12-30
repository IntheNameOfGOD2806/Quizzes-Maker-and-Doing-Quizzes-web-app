import { getAllQuiz, getlistUsers } from "../../../services/apiservice";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import Select from "react-select";
import "./ManageQuestion.scss";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { assignQuizToUser } from "../../../services/apiservice";
const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const options =
    listQuiz &&
    listQuiz.map((quiz) => {
      return {
        value: quiz.id,
        label: `${quiz.id}-${quiz.name}`,
      };
    });
  const options1 =
    listUser &&
    listUser.map((user) => {
      return {
        value: user.id,
        label: `${user.id}--${user.username}--${user.email}`,
      };
    });
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
  const fetchUserData = async () => {
    let res = await getlistUsers();
    if (res && res.EC === 0) {
      setListUser(res.DT);
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
  const handleAssignQuizToUser = async () => {
    let res = await assignQuizToUser(selectedQuiz?.value, selectedUser?.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  useEffect(() => {
    fetchQuizData();
    fetchUserData();
  }, []);
  return (
    <>
      <div className="assign-quiz-container container">
        <div className="manage-question-add-new col-4 row">
          <label className="form-label">Select Quiz:</label>
          <Select
            //  styles={{zIndex:"9999"}}
            defaultValue={selectedQuiz}
            options={options}
            onChange={setSelectedQuiz}
            className="select-quiz"
          />
        </div>
        <span style={{ marginTop: "35px" }}>
          <FaArrowRightArrowLeft
            style={{ color: "violet" }}
          ></FaArrowRightArrowLeft>
        </span>
        <div className="manage-question-add-new col-4 row">
          <label className="form-label">Select User:</label>
          <Select
            //  styles={{zIndex:"9999"}}
            defaultValue={selectedUser}
            options={options1}
            onChange={setSelectedUser}
            className="select-quiz"
          />
        </div>
      </div>
      <div
        style={{ marginLeft: "150px", marginTop: "20px" }}
        className="assign-button btn btn-warning"
        onClick={() => handleAssignQuizToUser()}
      >
        Assign
      </div>
    </>
  );
};
export default AssignQuiz;
