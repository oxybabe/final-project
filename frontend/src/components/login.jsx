import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useLocalStorage from "./UseLocalStorage";

export default function UserLogin() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser, removeUser] = useLocalStorage("user");

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }
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
        username: username,
        password: password,
      
      }),
    };
    const response = await fetch(
      "http://127.0.0.1:8000/auth/login/",
      options
    ).catch(handleError);
    if (!response.ok) {
      console.log("login not successful");
    }
    const data = await response.json();
    console.log({ data });
    setUser({
      username: username, 
      id: data.id,
      token: data.key,
    })
    Cookies.set("Authorization", `Token ${data.key}`);
    setIsValid(true);
    navigate("/recipes");
  };
  return (
    <>
      <Header />
      <h1 style={{ color: "#123c69" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label style={{ color: "#123c69" }}>Username</Form.Label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameInput}
          ></input>

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "#123c69" }}>Password</Form.Label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
          ></input>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {/* <Form.Check type="checkbox" label="Remember me" /> */}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#20695e" }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
