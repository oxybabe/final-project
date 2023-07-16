import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./Header";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      "http://localhost:8000/dj-rest-auth/registration/",
      options
    ).catch(console.log("did not work"));

    if (!response.ok) {
      setError(data);
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/recipes");
    }
  };
  // const handleRegistrationSubmit = async (e) => {
  //   e.preventDefault();
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //     body: JSON.stringify(user),
  //   };
  //   //TODO response is empty here
  //   const response = await fetch(
  //     "http://localhost:8000/dj-rest-auth/registration/",
  //     options
  //   ).catch(console.log("did not work"));
  //   if (response) {
  //     const data = await response.json();

  //     setError(data);
  //     alert("Response:", response);

  //     throw new Error("Network response was not OK");
  //   } else {
  //     Cookies.set("Authorization", `Token ${data.key}`);
  //     navigate("/recipes");
  //   }

  // const response = await fetch(
  //   `http://localhost:8000/dj-rest-auth/registration/`,
  //   options
  // ).catch((error) => {
  //   console.log("Error occurred while making the request:", error);
  //   return { status: 500, text: "Request failed" };
  // });
  // alert("Response:", response);
  //Afer response is filled you should be able to get the data needed

  // Check the status of the response

  // Read the response body as text
  // const responseBody = await response.text();
  // console.log("Response body:", responseBody);

  // Attempt to parse the response body as JSON
  // let data;
  // try {
  //   data = JSON.parse(responseBody);
  // } catch (error) {
  //   console.log("Error occurred while parsing JSON:", error);
  // }
  // console.log("Data:", data);

  // if (data) {
  //   const data = await response.json();
  //   debugger;
  //   Cookies.set("Authorization", `Token ${data.key}`);
  //   navigate("/login")
  // };

  //   if (!response.ok) {
  //     setError(responseBody);

  //     setError(data);
  //     throw new Error("Network response was not OK");
  //   } else {
  //     Cookies.set("Authorization", `Token ${data.key}`);
  //     console.log("Data:", data);

  //     navigate("/login");
  //   }
  // };
  // if (response) {
  //   const data = await response.json();

  // if (!response.ok) {
  //   setError(data);
  //   throw new Error("Network response was not OK");
  // } else {
  //   Cookies.set("Authorization", `Token ${data.key}`);
  //   navigate("/recipes");
  // }

  return (
    <>
      <Header />
      <Form onSubmit={handleRegistrationSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter username"
            value={user.username}
            onChange={handleInput}
          ></input>

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <input
            className="form-control"
            type="password1"
            name="password1"
            placeholder="Password"
            value={user.password1}
            onChange={handleInput}
          ></input>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <input
            className="form-control"
            type="password2"
            name="password2"
            placeholder="Confirm Password"
            value={user.password2}
            onChange={handleInput}
          ></input>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UserRegistration;