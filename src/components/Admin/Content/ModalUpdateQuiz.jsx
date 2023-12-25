import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import Select from "react-select";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../services/apiservice";
import "./ManageQuiz.scss";
function ModalUpdateQuiz(props) {
  const { show, setShow, fetchQuizData } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState({ label: "EASY", value: "EASY" });
  const [image, setImage] = useState("");
  const [previewimage, setPreviewimage] = useState(null);
  const [id, setId] = useState(null);

  const options = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];
  //
  useEffect(() => {
    if (props.dataUpdateQuiz) {
      setName(props.dataUpdateQuiz.name);
      const dataType = props.dataUpdateQuiz.difficulty;
      setDescription(props.dataUpdateQuiz.description);
      setCategory({ label: `${dataType}`, value: `${dataType}` });
      setImage(props.dataUpdateQuiz.image);
      setId(props.dataUpdateQuiz.id);
      setPreviewimage(`data:image/jpeg;base64, ${props.dataUpdateQuiz.image}`);
    }
  }, [props]);
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewimage(URL.createObjectURL(file));
    }
  };
  const handleClose = () => setShow(false);

  const handleUpdateQuiz = async (
    id,
    name,
    description,
    difficulty,
    quizImage
  ) => {
    let res = await putUpdateQuiz(id, name, description, difficulty, quizImage);
    if (res && res.EC === 0) {
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
    handleClose();
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <div className="manage-quiz-container">
          <div className="title">Update Quiz</div>
          <div className="add-new">
            <fieldset className="border rounded-3 p-3">
              <legend className="float-none w-auto px-3">
                Update Quiz Form:
              </legend>
              <FloatingLabel controlId="floatingTextarea" label="Name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  style={{ height: "100px", marginBottom: "10px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <label className="form-label" htmlFor="file-upload">
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
                  id="file-upload"
                  onChange={(e) => handleChangeFile(e)}
                />
                <div
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                  className="image-preview"
                >
                  {previewimage && (
                    <img
                      style={{ maxHeight: "100px", maxWidth: "100px" }}
                      src={`${previewimage}`}
                      alt=""
                    />
                  )}

                  {!previewimage && <span>Preview Image</span>}
                </div>
              </div>
              <div className="image-preview"></div>
              <button
                onClick={() =>
                  handleUpdateQuiz(
                    id,
                    name,
                    description,
                    category?.value,
                    image
                  )
                }
                style={{ marginTop: "10px" }}
                className="btn btn-warning"
              >
                SUBMIT
              </button>
            </fieldset>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalUpdateQuiz;
