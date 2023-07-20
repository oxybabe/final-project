import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import UserRegistration from "./register";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/esm/Button";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <Header />
        <h1 style={{ color: "#123c69" }}>Meal Master </h1>
        <h2 style={{ color: "#123c69" }}>
          Flavorful Feasts, All In One Place!
        </h2>
        <Carousel>
          <Carousel.Item interval={3500}>
            <img
              className="d-block w-100"
              src="./public/media/chocolatecake.jpg"
              alt="First slide"
              style={{ width: "300px", height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3500}>
            <img
              className="d-block w-100"
              src="./public/media/food and drink.jpg"
              alt="Second slide"
              style={{ width: "300px", height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3500}>
            <img
              className="d-block w-100"
              src="./public/media/meal.jpg"
              alt="Third slide"
              style={{ width: "300px", height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3500}>
            <img
              className="d-block w-100"
              src="./public/media/brooke-lark-HlNcigvUi4Q-unsplash.jpg"
              alt="Third slide"
              style={{ width: "300px", height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Button
          size="sm"
          style={{ backgroundColor: "#20695e" }}
          onClick={handleLoginClick}
        >
          Click to Login
        </Button>{" "}
      </div>
    </>
  );
};

export default Home;
