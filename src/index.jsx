import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import 'nprogress/nprogress.css';
import { Provider } from "react-redux";
import { store, persistor } from "../src/redux/store";
import { useRoutes,Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}>
    <Layout></Layout>
</Provider>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
