import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";import axios from "axios";
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

    // Perform user Registration here with the provided username and password

    const url = "http://localhost:3000/register"; // Replace with your API endpoint
    const data = {
      username: username,
      password: password,
    };

    // console.log(username, password);
    const postApiData = async (url, data) => {
      try {
        const response = await axios.post(url, data);
        const responseData = response.data;
        
        
    
        if (response.status === 201) {
          // If the response status is 200 (Success)
          
          console.log(responseData);

          

          toast({
            title: "Success",
            description: responseData.status,
            position: "top-left",
            status: "success",
            duration: 8000,
            isClosable: true,
          });
    
          // Navigate to the login page after successful registration
          navigate(`${responseData.path}`);
          
        } 
        else {

          console.log("email already in use !!!")
          toast({
            title: "Already Existing User",
            description: "This email is already in use.",
            position: "top-left",
            status: "error",
            duration: 8000,
            isClosable: true,
          });
        }

      } catch (error) {
        console.error("Error making POST request:", error);
        
        toast({
          title: "Error",
          description: "An error occurred while processing the request.",
          position: "top-left",
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      }

    };

    // Reset the form fields after submitting
    setUsername("");
    setPassword("");

    postApiData(url, data);
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
