import Modal from "./Modal";
import { FaUserPlus } from "react-icons/fa";
import "./ManageUser.scss";
import "./Modal.scss";
import { useState } from "react";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            onClick={() => setShowModalCreateUser(true)}
            className="btn btn-primary"
          >
            {" "}
            <FaUserPlus></FaUserPlus>Add new user
          </button>
        </div>
        <div className="table-user-container">List user</div>
        {/* modal add user */}
        <Modal show={showModalCreateUser} setShow={setShowModalCreateUser} />
      </div>
    </div>
  );
};
export default ManageUser;
