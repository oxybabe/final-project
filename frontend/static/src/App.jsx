import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import MyCalendar from "./components/Calendar";
import MyRecipes from "./components/MyRecipes";
import UserRegistration from "./components/Register";
import Home from "./components/Home";
import Recipes from "./components/recipes";
import icon from "./media/meal_logo.ico";

const App = () => {
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    favicon.setAttribute("href", icon);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/calendar" element={<MyCalendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
