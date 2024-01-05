import { FaHeart, FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../Header/language";
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
          <FaBars
            className="set-collapse-bar"
            style={{ marginTop: "20px" }}
            onClick={() => setCollapse(!collapse)}
          ></FaBars>
          <div className="admin-header-right">
            <span className="language">
              <Language />
            </span>
            <div>
              <DropdownButton id="dropdown-basic-button" title="Settings">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <hr className="admin-hr" />
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
