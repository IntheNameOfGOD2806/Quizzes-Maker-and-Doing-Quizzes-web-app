import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ManageQuiz.scss";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import Select from "react-select";
import { useEffect, useState } from "react";
import { postCreateQuiz } from "../../../services/apiservice";
import { toast } from "react-toastify";
import QuizTable from "./QuizTable";
import { getAllQuiz,deleteQuizById } from "../../../services/apiservice";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState({ label: "Easy", value: "Easy" });
  const [image, setImage] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);

  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  //
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };
  const fetchQuizData = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
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
  
  useEffect(() => {
    fetchQuizData();
  }, []);
  const handleSubmitPostQuiz = async () => {
    let res = await postCreateQuiz(name, description, category.value, image);
    // console.log(res);
    if (res && res.EC === 0) {
      setName("");
      setDescription("");
      setCategory("Easy");
      setImage(null);
      toast.success(res.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
      fetchQuizData();
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
  return (
    <>
      <div style={{ padding: "0px 20px" }}>
        <div className="quiz-detail">
          <QuizTable
          listQuiz={listQuiz}
     setListQuiz={setListQuiz}
     fetchQuizData={fetchQuizData}
          ></QuizTable>
        </div>
      </div>
      <div className="manage-quiz-container">
        <div className="title">Add Quiz</div>
        <div className="add-new">
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Add new Quiz:</legend>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Name"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <Form.Control type="text" placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <div style={{ marginTop: "10px" }}>
              <span>Quiz Category:</span>
            </div>
            <div className="quiz-image-upload">
              <Select
                className="drop-select"
                // styles={{ marginTop: "5px" }}
                placeholder="Select Quiz Category..."
                options={options}
                value={category}
                defaultValue={category}
                onChange={setCategory}
              />
              <label
                onClick={(e) => handleChangeFile(e)}
                className="form-label"
                htmlFor="file"
              >
                <MdOutlineDriveFolderUpload
                  style={{ height: "20px", width: "20px" }}
                  className="icon"
                />{" "}
                Upload Quiz Image
              </label>
              <input
                className="form-control"
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => handleChangeFile(e)}
              />
            </div>
            <div className="image-preview"></div>
            <button
              onClick={() => handleSubmitPostQuiz()}
              style={{ marginTop: "10px" }}
              className="btn btn-warning"
            >
              SUBMIT
            </button>
          </fieldset>
        </div>
      </div>
    
    </>
  );
};
export default ManageQuiz;
