// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/register";
    const data = {
      username: username,
      password: password,
    };

    const postApiDataForUserRegistration = async (url, data) => {
      try {
        const response = await axios.post(url, data);
        const responseData = response.data;

        if (response.status === 201) {
          console.log("User Registration Successful");

          // Navigate to the login page after successful registration
          navigate(`${responseData.path}`);
        } else {
          console.log("email already in use !!!");
        }
      } catch (error) {
        console.error("Error making POST request:", error);
      }
    };

    // Reset the form fields after submitting
    setUsername("");
    setPassword("");

    postApiDataForUserRegistration(url, data);
  };

  return (
    <div>
      <h2>Register for PrivateCoo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
