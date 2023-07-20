import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import UserLogin from "./components/login";
import MyCalendar from "./components/calendar";
import MyRecipes from "./components/myrecipes";
import UserRegistration from "./components/Register";
import Home from "./components/Home";
import Recipes from "./components/recipes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Login" element={<UserLogin />} />
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
