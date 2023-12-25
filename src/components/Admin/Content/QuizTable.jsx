import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import { getAllQuiz } from "../../../services/apiservice";
import { toast } from "react-toastify";
import './QuizTable.scss'
import ModalDeleteQuiz from "./ModalDeleteQuiz";
function QuizTable(props) {
const{listQuiz,fetchQuizData}=props;
const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
const[deleteId,setDeleteId]=useState();
const handleClickDeleteQuiz=(id)=>{
    setDeleteId(id)
   setShowModalDeleteQuiz(true);
}

//   useEffect(() => {
    
//   }, []);
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  className=""
                >
                  List Quizzes
                </div>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th> Name</th>
                      <th> Description</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listQuiz &&
                      listQuiz.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td>
                              <div className="d-flex justify-content-center gap-3">
                              <button className="btn btn-primary">
                                  View
                                </button>
                                <button className="btn btn-warning">
                                  Edit
                                </button>
                                <button className="btn btn-danger"
                                onClick={() => handleClickDeleteQuiz(item.id)}>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ModalDeleteQuiz
      show={showModalDeleteQuiz}
      deleteId={deleteId}
      setShow={setShowModalDeleteQuiz}
      fetchQuizData={fetchQuizData}
    />

    </>
  );
}

export default QuizTable;
