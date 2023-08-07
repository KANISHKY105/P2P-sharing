import axios from "axios";
import React, { useState } from "react";



const LoginForm = () => {
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
  
      // Perform login authentication here with the provided username and password

      const postApiData = async (url, data) => {
        try {
          const res = await axios.post(url, data);
          // Handle the response data here (optional)
          console.log('POST request successful:', res.data);
          
        } catch (error) {
        
          console.error('Error making POST request:', error);
          
        }
      };
      
  
      // Reset the form fields after submitting
      setUsername("");
      setPassword("");
    };
  
    return (
      <div>
        <h2>Login in to PrivateCoo</h2>
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
        </form>
      </div>
    );
  }

export default LoginForm
