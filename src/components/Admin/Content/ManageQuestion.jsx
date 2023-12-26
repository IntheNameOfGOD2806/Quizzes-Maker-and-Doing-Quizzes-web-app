import Select from "react-select";
import { useState } from "react";
import "./ManageQuestion.scss";
import { FcPlus } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { PiPlusSquareThin } from "react-icons/pi";
import { HiOutlineMinusCircle } from "react-icons/hi2";
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
      <div style={{ marginTop: "30px" }}>
        <span>Add question:</span>
      </div>
      <div className="form-add-new-wrapper col-6">
        <div class="form-floating mb-3 col-6 ">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label style={{ color: "#ccc" }} for="floatingInput">
            Description
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
              />
            </span>
            <span>
              <FaTrash
                className="icon"
                style={{ height: "30px", width: "30px", color: "red" }}
              />
            </span>
          </span>
        </div>
      </div>
      {/* answer container */}
      <div className="answer-container">
        <div className="answer-add-new-wrapper ">
          <input
            style={{ marginRight: "10px" }}
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <div class="form-floating mb-3 col-4 ">
            <input
              type="text"
              class="form-control "
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label style={{ color: "#ccc" }} for="floatingInput">
              Answer 1
            </label>
          </div>
          <span
            className="icon-container"
            style={{ display: "flex", gap: "10px", marginLeft: "20px" }}
          >
            <span>
              <PiPlusSquareThin
                className="icon"
                style={{ height: "30px", width: "30px", color: "green" }}
              />
            </span>
            <span>
              <HiOutlineMinusCircle
                className="icon"
                style={{ height: "30px", width: "30px", color: "red" }}
              />
            </span>
          </span>
        </div>
      </div>
      {/* end of answer container */}
         {/* answer container */}
         <div className="answer-container">
        <div className="answer-add-new-wrapper ">
          <input
            style={{ marginRight: "10px" }}
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <div class="form-floating mb-3 col-4 ">
            <input
              type="text"
              class="form-control "
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label style={{ color: "#ccc" }} for="floatingInput">
              Answer 1
            </label>
          </div>
          <span
            className="icon-container"
            style={{ display: "flex", gap: "10px", marginLeft: "20px" }}
          >
            <span>
              <PiPlusSquareThin
                className="icon"
                style={{ height: "30px", width: "30px", color: "green" }}
              />
            </span>
            <span>
              <HiOutlineMinusCircle
                className="icon"
                style={{ height: "30px", width: "30px", color: "red" }}
              />
            </span>
          </span>
        </div>
      </div>
      {/* end of answer container */}
    </div>
  );
};
export default ManageQuestion;
