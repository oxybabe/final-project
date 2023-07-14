import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showForm, setShowForm] = useState(false);

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
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8000/dj-rest-auth/registration/",
        options
      );
      if (response.ok) {
        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        navigate("/recipes");
      } else {
        console.log("Registration not successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegisterButtonClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <h2>Register</h2>
          <form onSubmit={handleRegistrationSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInput}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </>
      ) : (
        <button onClick={handleRegisterButtonClick}>Click to Register</button>
      )}
    </>
  );
};

export default UserRegistration;
