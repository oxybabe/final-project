import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function UserLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleError = (err) => {
    console.log(err);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };
    const response = await fetch(
      "http://localhost:8000/dj-rest-auth/login/",
      options
    ).catch(handleError);
    if (!response.ok) {
      console.log("login not successful");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    navigate("/recipes");
    console.log(data);
  };
  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit}>
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
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInput}
          ></input>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
