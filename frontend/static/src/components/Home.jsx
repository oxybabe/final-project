import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <div class="bg">
        <img
          src={require("../media/home.jpg")}
          alt=""
          style={{ filter: "brightness(0.4)", opacity: "0.8" }}
        />

        <div className="header">
          <h1 style={{ color: "white" }}>Meal Master </h1>
          <h2 style={{ color: "white" }}>
            Flavorful Feasts, All In One Place!
          </h2>

          {!user && (
            <div>
              <Button
                className="btn"
                size="sm"
                style={{ backgroundColor: "#20695e" }}
                onClick={() => navigate("/register")}
              >
                Click to Register
              </Button>{" "}
              <Button
                className="btn"
                size="sm"
                style={{ backgroundColor: "#20695e" }}
                onClick={() => navigate("/login")}
              >
                Click to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
