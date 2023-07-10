import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UserLogin from "./login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello!</div>,
  },
  {
    path: "/login",
    element: <UserLogin/>,
  }
]);




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
