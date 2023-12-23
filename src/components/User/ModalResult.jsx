import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


import { toast } from "react-toastify";
import "animate.css";
function ModalResult(props) {


  const { show, setShow } = props;
//   const handleDeleteUser = async () => {
//     let data = await 
//     // console.log(data)
//     if (data && data.EC === 0) {
//       toast.success(data.EM, {
//         position: toast.POSITION.TOP_RIGHT,
//         className: "foo-bar",
//         autoClose: 2000,
//         draggable: true,
//       });
//       await props.reRenderListUser();
//       handleClose();
//     }
//     if (data && data.EC !== 0) {
//       toast.error(data.EM, {
//         position: toast.POSITION.TOP_RIGHT,
//         className: "foo-bar",
//         autoClose: 2000,
//         draggable: true,
//       });
//     }
//   };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="">Total Score:</div>
         <div className="">Total Questions:</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalResult;
