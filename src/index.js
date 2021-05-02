import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import setupMockServer from "./api/mock.server";
import { DataProvider } from "./context/data-context";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";

// setupMockServer();

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
