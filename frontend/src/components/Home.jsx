import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import UserRegistration from "./register";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div >
        <Header />
        <h1 style={{ color: "black" }}>Welcome to Meal Master</h1>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="./public/media/chocolatecake.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              src="./public/media/food and drink.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./public/media/meal.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <button
          style={{ backgroundColor: "#20695e" }}
          onClick={handleLoginClick}
        >
          Click to login
        </button>

        {/* <UserRegistration /> */}
      </div>
    </>
  );
};

export default Home;
