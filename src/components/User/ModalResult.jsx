import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


import { toast } from "react-toastify";
import "animate.css";
function ModalResult(props) {


  const { show, setShow,dataModalResult,setShowAnswer } = props;
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
    setShowAnswer(true)
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="">Total Score:{dataModalResult.countCorrect}</div>
         <div className="">Total Questions:{dataModalResult.countTotal}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={()=>{handleClose()}} variant="danger" >
            
            Show Result Details
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalResult;
