import { FaHeart, FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PerfectScrollbar from "react-perfect-scrollbar";
const Admin = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        {/* side bar component */}

        <SideBar collapsed={collapse}></SideBar>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          {/* set collapse bar */}
          <FaBars style={{ marginTop: "20px" }} onClick={() => setCollapse(!collapse)}></FaBars>
        </div>
        <>
          <div className="admin-main">
            {/* {/* main content} */}
            <Outlet></Outlet>
          </div>
        </>
      </div>

      <ToastContainer />
    </div>
  );
};
export default Admin;
