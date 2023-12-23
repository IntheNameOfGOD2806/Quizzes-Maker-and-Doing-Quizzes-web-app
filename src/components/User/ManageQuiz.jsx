import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./ManageQuiz.scss";
const ManageQuiz = () => {
  return (
    <>
      <div className="manage-quiz-container">
        <div className="title">Manage Quiz</div>
        <div className="add-new">
          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <fieldset  className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Personalia:</legend>
            <label for="fname">First name:</label>
            <input type="text" id="fname" name="fname" />
            <br></br>
            <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" />
            <br></br>/ <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
            <br></br>
            <label for="birthday">Birthday:</label>
            <input type="date" id="birthday" name="birthday" />
            <br></br>
            <input type="submit" value="Submit" />
          </fieldset>
        </div>
        <div className="quiz-detail"></div>
      </div>
    </>
  );
};

export default ManageQuiz;
