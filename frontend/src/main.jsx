import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.jsx";
import App from "./App.jsx";
import Recipe from "./recipes.jsx";
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
import MyCalendar from "./calendar.jsx";

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
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/Login" element={<UserLogin />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/recipes" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
