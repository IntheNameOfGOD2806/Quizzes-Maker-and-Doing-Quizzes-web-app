import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import{Provider} from  'react-redux';
import store from '../src/redux/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Contact from './routes/contact';
import Header from './components/Header/Header';
import Homepage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
// import Root from './routes/Root';
// import ErrorPage from './error-page';
// import Contact from './routes/contact';
const router = createBrowserRouter([ 
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index:true,
        element: <Homepage />,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: "contacts",
        element: <Contact />,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: "/User",
        element: <User></User>,
        errorElement: <ErrorPage></ErrorPage>
      },
    ],
  },
  {
    path: "/Admin",
    element: <Admin></Admin>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        element:<DashBoard></DashBoard>,
        errorElement: <ErrorPage></ErrorPage>
      }
      ,
      {
        path:"ManageUser",
        element:<ManageUser></ManageUser>,
        errorElement: <ErrorPage></ErrorPage>
      }
    ]
  }
,
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router} >
  </RouterProvider>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
