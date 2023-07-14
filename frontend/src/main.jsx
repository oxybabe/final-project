import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home.jsx";
import App from "./App.jsx";
import Recipe from "./components/recipes.jsx";
import "./index.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import UserLogin from "./components/login.jsx";
import MyCalendar from "./components/calendar.jsx";



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
