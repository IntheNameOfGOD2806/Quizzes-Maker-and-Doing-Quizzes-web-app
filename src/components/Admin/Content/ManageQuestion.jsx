import Select from "react-select";
import { useState } from "react";
import "./ManageQuestion.scss";
import { FcPlus } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
const ManageQuestion = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState("");
  return (
    <div className="manage-question-container">
      <div className="title">Manage Question</div>
      <div className="manage-question-add-new col-6 ">
        <label className="form-label">Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          options={options}
          onChange={setSelectedQuiz}
          className=""
        />
      </div>
       <div style={{ marginTop: "30px" }}><span>Add question:</span></div>
      <div  class="form-floating mb-3 col-6 ">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label style={{color:"#ccc"}} for="floatingInput">Description</label>
      </div>
      <div style={{flexDirection:"row"}} className=" d-flex gap-3 ">
        <label htmlFor="">Upload Image:</label>
        <input type="file" name="" id=""  />
      </div>
      <div>
        <span>
          <FcPlus className="icon" style={{ height: "30px", width: "30px" }} />
        </span>
        <span>
          <FaTrash className="icon" style={{ height: "30px", width: "30px" }} />
        </span>
      </div>
    </div>
  );
};
export default ManageQuestion;
