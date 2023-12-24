import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ManageQuiz.scss";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import Select from "react-select";
import { useState } from "react";
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Easy");
  const [image, setImage] = useState(null);
  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  //
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };
  const handleSubmitdata = () => {
    
  }
  return (
    <>
      <div className="manage-quiz-container">
        <div className="title">Manage Quiz</div>
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
            <div className="quiz-image-upload">
              <Select
                className="drop-select"
                styles={{ marginTop: "10px" }}
                placeholder="Select Quiz Category..."
                options={options}
                value={ category}
                defaultValue={category}
                onChange={() => setCategory()}
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
            onClick={()=>handleSubmitdata()} 
             style={{ marginTop: "10px" }} className="btn btn-warning">
              SUBMIT
            </button>
          </fieldset>
        </div>
        <div className="quiz-detail"></div>
      </div>
    </>
  );
};
export default ManageQuiz;
