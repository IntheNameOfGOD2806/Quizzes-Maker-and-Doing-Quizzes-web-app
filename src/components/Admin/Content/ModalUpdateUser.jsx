import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import imageP from "../../../assets/pexels-steve-johnson-1000366.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { putUpdateUser } from "../../../services/apiservice";
import _ from "lodash";
const ModalUpdateUser = (props) => {
  const style1 = { color: "#0B5ED7" };
  const { show, setShow } = props;
  const { userUpdateData, setUserUpdateData } = props;
  //statelization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [previewimage, setPreviewimage] = useState(null);
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);

  useEffect(() => {
     console.log("useeffect")
    if (!_.isEmpty(userUpdateData)) {
     
      //   console.log(
      //     "🚀 ~ file: ModalUpdateUser.jsx:18 ~ useEffect ~ userDataUpdate:",
      //     userUpdateData
      //   );
      setEmail(userUpdateData.email);
      setUsername(userUpdateData.username);
      userUpdateData.image && setPreviewimage(`data:image/jpeg;base64,${userUpdateData.image}`);
      setRole(userUpdateData.role);

      //   console.log(role)
    }
  }, [userUpdateData]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewimage(null);
    setImage(null);
    setUserUpdateData({});
  };
  // Handle upload image
  const handleUploadImage = (e) => {
    if (e.target && e.target.files[0] && e.target.files) {
      const file = e.target.files[0];
      setPreviewimage(URL.createObjectURL(file));
      setImage(URL.createObjectURL(file));
    } else {
      // setPreviewimage(null);
    }
  };
  //handle submit user
  const handleUpdateUser = async () => {
    // validate

    //submit data
    let data = await putUpdateUser(userUpdateData.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success("Update user success", {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
      // re render list users
      await props.reRenderListUser();
      //close modal
      handleClose();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
    }
  };
  //validate
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  // return
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop={"static"}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User Infor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <input
                disabled
                autoComplete="on"
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <div className="email-status">
                {validateEmail(email) && (
                  <span style={{ color: "green" }}>email is valid</span>
                )}
                {!validateEmail(email) && email !== "" && (
                  <span style={{ color: "red" }}>email is invalid</span>
                )}
              </div> */}
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Password
              </label>
              <input
                disabled
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label for="inputUsername" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label for="inputRole" className="form-label">
                Role
              </label>

              <select
                id="inputState"
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
              >
                {role === "ADMIN" && (
                  <>
                    <option value={"USER"}>ADMIN</option>
                    <option value={"ADMIN"}>USER</option>
                  </>
                )}
                {role === "USER" && (
                  <>
                    <option value={"USER"}>USER</option>
                    <option value={"ADMIN"}>ADMIN</option>
                  </>
                )}
              </select>
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor={"labelupload"}
              >
                <FaUpload style={style1}></FaUpload>
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelupload"
                onChange={(e) => handleUploadImage(e)}
              ></input>
              {/* preview image */}
              <div className="col-md-6 img-preview">
                {previewimage ? (
                  <img src={previewimage} alt="noimage" />
                ) : (
                  <div className="preview-image">Preview image</div>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
