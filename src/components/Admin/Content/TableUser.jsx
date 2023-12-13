import { useState, useEffect } from "react";
import { getlistUsers } from "../../../services/apiservice";
const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let res = await getlistUsers();
    // console.log(res);
    if (res && res.EC === 0) {
      setListUser(res.DT);
    }
  };
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
          {listUser.length === 0 && (
            <div>
              <p style={{ color: "red" }}> No data</p>
            </div>
          )}
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
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>

                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
