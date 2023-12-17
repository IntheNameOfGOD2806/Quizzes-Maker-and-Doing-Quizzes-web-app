import Modal from "./Modal";
import { FaUserPlus } from "react-icons/fa";
import "./ManageUser.scss";
import "./Modal.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";
import {
  getlistUsers,
  getlistUsersPaginate,
} from "../../../services/apiservice";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import _ from "lodash";

const ManageUser = (props) => {
  //state
  const [listUser, setListUser] = useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalviewUser, setShowModalviewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [userUpdateData, setUserUpdateData] = useState({});
  const [userViewData, setUserViewData] = useState({});
  const [userDeleteData, setUserDeleteData] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  //
  useEffect(() => {
    fetchListUser();
  }, [page, itemsPerPage]);

  const fetchListUser = async () => {
    let res = await getlistUsersPaginate(page, itemsPerPage);
    // console.log(res);
    if (res && res.EC === 0) {
      setListUser(res.DT.users);
      // console.log(res.DT);

      setPageCount(res.DT.totalPages);
    }
  };
  const handleClickUpdateUser = (user) => {
    setUserUpdateData(user);
    // console.log("data:", userUpdateData)
    setShowModalUpdateUser(true);
  };
  const handleClickviewUser = (user) => {
    setUserViewData(user);
    setShowModalviewUser(true);
  };
  const handleClickDeleteUser = (user) => {
    setUserDeleteData(user);
    setShowModalDeleteUser(true);
  };
  const reRenderListUser = () => {
    fetchListUser();
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            onClick={() => setShowModalCreateUser(true)}
            className="btn btn-primary "
          >
            {" "}
            <FaUserPlus></FaUserPlus>Create new user
          </button>
        </div>
        <div className="table-user-container">List user</div>

        <TableUserPaginate
          handleClickUpdateUser={handleClickUpdateUser}
          listUser={listUser}
          handleClickviewUser={handleClickviewUser}
          handleClickDeleteUser={handleClickDeleteUser}
          reRenderListUser={reRenderListUser}
          pageCount={pageCount}
          page={page}
          setPage={setPage}

      
        ></TableUserPaginate>

        {/* modal add user */}
        <Modal
          reRenderListUser={reRenderListUser}
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          page={page}
          setPage={setPage}
        />
        <ModalUpdateUser
          reRenderListUser={reRenderListUser}
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdateData={userUpdateData}
          setUserUpdateData={setUserUpdateData}
        />
        <ModalViewUser
          show={showModalviewUser}
          setShow={setShowModalviewUser}
          userViewData={userViewData}
          setUserViewData={setUserViewData}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          userDeleteData={userDeleteData}
          reRenderListUser={reRenderListUser}
        />
      </div>
    </div>
  );
};
export default ManageUser;
