import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate(); // Import and use the navigate function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/login"; // Correct URL for login
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(url, data);
      const responseData = response.data;

      if (response.status === 200) {
        console.log("User Logged In Successfully");

        // Navigate to a relevant page after successful login
        navigate(`${responseData.path}`);
      } else {
        console.log("Login failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }

    // Reset the form fields after submitting
    setUsername("");
    setPassword("");
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google Sign In URL
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div>
      <h2>Login to PrivateCoo</h2>
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
          <button type="submit">Login</button>
        </div>
        <div>
          <button type="button" onClick={handleGoogleSignIn}>
            Google Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
