import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const store = createStore();

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// getMyProps = ()=>{
//   const keys = Object.keys(this.props).map(entry=>entry);
//   const values = Object.values(this.props).map(entry=>entry);
//   let results = {};
//   keys.forEach((key, index)=>results[key] = typeof values[index]);
//   return results;
// }
