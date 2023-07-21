import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
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
      "/dj-rest-auth/registration/",
      options
    );

    if (!response.ok) {
      // setError(data);
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      navigate("/login");
    }
  };

  return (
    <>
      <h1 style={{ color: "#123c69" }}>Registration</h1>
      <Form onSubmit={handleRegistrationSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label style={{ color: "#123c69" }}>Email</Form.Label>
          <input
            className="form-control"
            type="text"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label style={{ color: "#123c69" }}>Username</Form.Label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter username"
            value={user.username}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "#123c69" }}>Password</Form.Label>
          <input
            className="form-control"
            type="password"
            name="password1"
            placeholder="Password"
            value={user.password1}
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: "#123c69" }}>Confirm Password</Form.Label>
          <input
            className="form-control"
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={user.password2}
            onChange={handleInput}
          />
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
};

export default UserRegistration;
