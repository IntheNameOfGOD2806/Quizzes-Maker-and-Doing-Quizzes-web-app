import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "./App";
import "./index.css";
// import { Provider } from "react-redux";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useSelector } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../src/redux/store";
import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageQuestion from "./components/Admin/Content/ManageQuestion";
import ManageQuiz from "./components/Admin/Content/ManageQuiz";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Homepage from "./components/Home/HomePage";
import DetailQuiz from "./components/User/DetailQuiz";
import ListQuiz from "./components/User/listQuiz";
import ErrorPage from "./error-page";
// import Root from './routes/Root';
// import ErrorPage from './error-page';
// import Contact from './routes/contact';
const Layout = (props) => {
  const isLoginned = useSelector((state) => state.user.isAuthenticated);
  console.log(isLoginned);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <Homepage />,
          errorElement: <ErrorPage></ErrorPage>,
        },
        {
          path: "/user",
          element:isLoginned?  <ListQuiz />:<Navigate to="/login"/>,
          errorElement: <ErrorPage></ErrorPage>,
        },
      ],
    },
    {
      path: "/Admin",
      element: isLoginned?  <Admin />:<Navigate to="/login"/>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          index: true,
          element: <DashBoard></DashBoard>,
          errorElement: <ErrorPage></ErrorPage>,
        },
        {
          path: "ManageUser",
          element: <ManageUser></ManageUser>,
          errorElement: <ErrorPage></ErrorPage>,
        },
        {
          path: "ManageQuiz",
          element: <ManageQuiz></ManageQuiz>,
          errorElement: <ErrorPage></ErrorPage>,
        },
        {
          path: "ManageQuestion",
          element: <ManageQuestion></ManageQuestion>,
          errorElement: <ErrorPage></ErrorPage>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/Register",
      element: <Register></Register>,
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/quiz/:id",
      element: <DetailQuiz></DetailQuiz>,
      errorElement: <ErrorPage></ErrorPage>,
    },
  ]);
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
      <ToastContainer></ToastContainer>
    </>
  );
};
export default Layout;
