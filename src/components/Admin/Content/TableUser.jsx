import { useState, useEffect, useLayoutEffect } from "react";
import "animate.css";
import _ from "lodash";
import TableUserPaginate from "./TableUserPaginate";
const TableUser = (props) => {
  //   const [listUser, setListUser] = useState([]);
  const { listUser } = props;
  const isDataEmpty = _.isEmpty(listUser);

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-primary "
                      onClick={() => props.handleClickviewUser(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickUpdateUser(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {isDataEmpty && (
            <tr>
              <td colSpan="5" className="text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
