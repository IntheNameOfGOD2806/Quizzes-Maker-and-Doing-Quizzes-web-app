import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
// import Root from './routes/Root';
// import ErrorPage from './error-page';
// import Contact from './routes/contact';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage></ErrorPage>,
//     children: [
//       {
//         index:true,
//         element: <Homepage />,
//         errorElement: <ErrorPage></ErrorPage>
//       },
//       {
//         path: "contacts",
//         element: <Contact />,
//         errorElement: <ErrorPage></ErrorPage>
//       },
//       {
//         path: "/User",
//         element: <User></User>,
//         errorElement: <ErrorPage></ErrorPage>
//       },
//     ],
//   },
//   {
//     path: "/Admin",
//     element: <Admin></Admin>,
//     errorElement: <ErrorPage></ErrorPage>,
//     children:[
//       {
//         index:true,
//         element:<DashBoard></DashBoard>,
//         errorElement: <ErrorPage></ErrorPage>
//       }
//       ,
//       {
//         path:"ManageUser",
//         element:<ManageUser></ManageUser>,
//         errorElement: <ErrorPage></ErrorPage>
//       }
//     ]
//   }
// ,
// {
//   path: "/login",
//   element: <Login></Login>,
//   errorElement: <ErrorPage></ErrorPage>
// }
// ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Layout />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
