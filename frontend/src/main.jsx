import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UserLogin from "./login.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello!</div>,
//   },
//   {
//     path: "/login",
//     element: <UserLogin />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home/>}/>
      <Route path="/Login" element={<UserLogin />} />
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
