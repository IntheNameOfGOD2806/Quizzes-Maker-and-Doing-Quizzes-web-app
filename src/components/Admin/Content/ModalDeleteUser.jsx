import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { deleteUser } from "../../../services/apiservice";

import { toast } from "react-toastify";
import "animate.css";
function ModalDeleteUser(props) {
  const { userDeleteData } = props;
  const { id } = userDeleteData;
  const { show, setShow } = props;
  const handleDeleteUser = async () => {
    let data = await deleteUser(id);
    // console.log(data)
    if (data && data.EC === 0) {
      toast.success(data.EM, {
        position: toast.POSITION.TOP_RIGHT,
        className: "foo-bar",
        autoClose: 2000,
        draggable: true,
      });
      await props.reRenderListUser();
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

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user confirmation!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are u sure want to delete the user with id: {id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDeleteUser;
