import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import _ from "lodash";

const ModalViewUser=(props)=>{
      //statelization
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [previewimage, setPreviewimage] = useState(null);
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState(null);
  const { show, setShow } = props;
  const { userViewData, setUserViewData } = props;
  useEffect(() => {
    if (!_.isEmpty(userViewData)) {
      setEmail(userViewData.email);
      setUsername(userViewData.username);
      userViewData.image && setPreviewimage(`data:image/jpeg;base64,${userViewData.image}`);
      setRole(userViewData.role);
    }
  }, [userViewData]);
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewimage(null);
    setImage(null);
    setUserViewData({});
    
  };
    return(
        <>
        <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop={"static"}
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>View User's Information</Modal.Title>
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
              disabled
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
                Role: {role}
              </label>
             
            </div>
            <div className="col-md-12">
         
            
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
       
        </Modal.Footer>
      </Modal>
        
        </>
    )
}
export default ModalViewUser