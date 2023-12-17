import "animate.css";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
//

const TableUserPaginate = (props) => {
  //   const [listUser, setListUser] = useState([]);
  const { listUser } = props;
  //   const{itemsPerPage}=props
  const isDataEmpty = _.isEmpty(listUser);
  const { pageCount } = props;
  const { setPage } = props;
  const{page}=props
  

  const handlePageClick = (event) => {
    const selectedPage = +event.selected + 1;
   
    setPage(selectedPage);
    

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
            <th style={{ display:"flex", justifyContent:"center" }} scope="col">Action</th>
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
                  <td className="action">
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
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel="< Prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page-1}
      />
    </>
  );
};
export default TableUserPaginate;
