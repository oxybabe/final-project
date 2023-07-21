import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { handleError } from "../utils";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser, removeUser] = useLocalStorage("user");

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
    const response = await fetch("/auth/login/", options).catch(handleError);
    if (!response.ok) {
      console.log("login not successful");
    }
    const data = await response.json();
    console.log({ data });

    setUser({
      username: username,
      id: data.id,
      token: data.key,
    });
    Cookies.set("Authorization", `Token ${data.key}`);
    navigate("/recipes");
  };

  return (
    <>
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
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
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
