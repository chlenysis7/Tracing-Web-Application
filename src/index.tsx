import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import reportWebVitals from "./reportWebVitals";

import App from "./App";
import store from "./store/index";
// import { Log } from "./helpers/common";
import axios from "axios";

const getToken = () => {
  let link = localStorage.getItem("api");
  return link ? link : process.env.REACT_APP_API_LINK;
};

const container: any = document.getElementById("root");
axios.defaults.baseURL = getToken();
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(Log);
