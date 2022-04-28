import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import awsconfig from "./aws-exports.js";
import { Amplify } from "aws-amplify";

Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
