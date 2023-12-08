import { FaHeart, FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
const Admin = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapse}></SideBar>
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapse(!collapse)}></FaBars>
        </div>
        <div className="admin-main">
          {" "}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default Admin;
