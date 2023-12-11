import { useState } from "react";

import imageP from "../../../assets/pexels-steve-johnson-1000366.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
function ModalUser(props) {
  const style1 = { color: "#0B5ED7" };
  const { show, setShow } = props;
  const handleClose = () => {
    
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewimage(null);
    setImage(null);
  }
  const handleShow = () => setShow(true);
  //statelization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [previewimage, setPreviewimage] = useState(null);
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);

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
  const handleSubmitUser = async() => {
    

    //validate

    //call api
    //  let data={
    //   email:email,
    //   password:password,
    //   username:username,
    //   role:role,
    //   userImage:image
    //  }
    //  console.log(data)
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("username", username);
    form.append("role", role);
    form.append("userImage",image);

   let res=await axios.post("http://localhost:8081/api/v1/participant", form);
   console.log(res)
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
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label for="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label for="inputPassword4" className="form-label">
                Password
              </label>
              <input
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
                id="inputAddress"
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
                <option default value={"USER"}>
                  USER
                </option>
                <option value={"ADMIN"}>ADMIN</option>
                <option>...</option>
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
          <Button variant="primary" onClick={handleSubmitUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUser;
