import { FaHeart, FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Admin.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = () => {
  const notify = () => {
    // toast("Default Notification !");

    // toast.success("Success Notification !", {
    //   position: toast.POSITION.TOP_CENTER,
    // });

    // toast.error("Error Notification !", {
    //   position: toast.POSITION.TOP_LEFT,
    // });

    // toast.warn("Warning Notification !", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });

    // toast.info("Info Notification !", {
    //   position: toast.POSITION.BOTTOM_CENTER,
    // });

    toast("Email not valid", {
      position: toast.POSITION.TOP_RIGHT,
      className: "foo-bar",
      autoClose: 2000,
      draggable:true
    });
  };
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
          <FaBars onClick={() => setCollapse(!collapse)}></FaBars>
        </div>
        <div className="admin-main">
          {/* {/* main content} */}
          <Outlet></Outlet>
          
        </div>
      </div>
  
      <ToastContainer/>
    </div>
  );
};
export default Admin;
