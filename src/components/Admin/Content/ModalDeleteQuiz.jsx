import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizById } from '../../../services/apiservice';
import { toast } from "react-toastify";
function ModalDeleteQuiz(props) {
  const {show, setShow,deleteId,fetchQuizData} = props

  const handleClose = () => setShow(false);
  const handleDeleteQuizById = async (id) => {
    let res = await deleteQuizById(id);
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
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are u sure want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
           onClick={() => handleDeleteQuizById(deleteId)}
          variant="primary" >
           Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalDeleteQuiz;