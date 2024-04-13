import { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from "react-toastify";
import { changePassword } from "../../services/apiservice";
import ViewProfile from "./ViewProfile";
function ModalUserProfile(props) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleChangePassword =async () => {
        let res=await changePassword(currentPassword,newPassword);
         if(res&&res.EC===0){
            toast.success(res.EM, {
                position: toast.POSITION.TOP_LEFT,
                className: "foo-bar",
                autoClose: 2000,
                draggable: true,
                theme: "dark",
              });
         }
         if(res&&res.EC!==0){
            toast.error(res.EM, {
                position: toast.POSITION.TOP_LEFT,
                className: "foo-bar",
                autoClose: 2000,
                draggable: true,
                theme: "dark",
              });
         }
    };
  return (
    <Modal
      show={props.show}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Profile" title="Profile">
            <ViewProfile />
          </Tab>
          <Tab eventKey="Change Password" title="Change Password">
            <Form.Group className="mb-3 col-4">
              <Form.Label>Old Password:</Form.Label>
              <Form.Control onChange={(e)=>setCurrentPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3 col-4">
              <Form.Label>New Password::</Form.Label>
              <Form.Control onChange={(e)=>setNewPassword(e.target.value)} />
            <div>
              <button onClick={handleChangePassword} style={{marginTop:"10px"}} className="btn btn-warning">
                Save
              </button>
            </div>
            </Form.Group>
          </Tab>
          <Tab eventKey="History" title="History">
            Tab content for Contactdssfs
           
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUserProfile;
