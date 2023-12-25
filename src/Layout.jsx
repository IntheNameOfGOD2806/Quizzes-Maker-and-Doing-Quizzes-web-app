import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store, persistor } from "../src/redux/store";
import { createBrowserRouter, RouterProvider,useParams  } from "react-router-dom";
import ErrorPage from "./error-page";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import Contact from "./routes/contact";
import Login from "./components/Auth/Login";
import Header from "./components/Header/Header";
import Homepage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./components/User/listQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/ManageQuiz";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-perfect-scrollbar/dist/css/styles.css';
// import Root from './routes/Root';
// import ErrorPage from './error-page';
// import Contact from './routes/contact';
const Layout = (props) => {

 
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
          path: "contacts",
          element: <Contact />,
          errorElement: <ErrorPage></ErrorPage>,
        },
        {
          path: "/user",
          element: <ListQuiz></ListQuiz>,
          errorElement: <ErrorPage></ErrorPage>,
        },
    
      ],
    },
    {
      path: "/Admin",
      element: <Admin></Admin>,
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
        }
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
      <ToastContainer></ToastContainer>
    </>
  );
};
export default Layout;
