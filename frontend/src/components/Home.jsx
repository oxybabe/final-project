import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <h1 style={{ color: "black" }}>Welcome to Recipe App</h1>
      <button onClick={handleLoginClick}>Click to login</button>
    </>
  );
};

export default Home;
