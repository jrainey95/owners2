// LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

// import auth from "../../../utils/auth";
import { LOGIN_USER } from "../../../utils/mutations";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          email: username, // Assuming the "username" field can be an email
          password: password,
        },
      });

      if (data.login.token) {
        // Handle successful login, e.g., store the token or redirect to a protected route.
        console.log('Login successful');
      } else {
        // Handle login failure.
        console.log('Login failed');
      }
    } catch (error) {
      // Handle network or server error.
      console.error('Error:', error);
    }
  };

  const handleForgotEmail = () => {
    // Implement the forgot email functionality here.
    console.log("Forgot email clicked");
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username/Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      
      <div>
        <button onClick={handleLogin}>Submit</button>
      </div>
      <div>
        <button onClick={handleForgotEmail}>Forgot Email</button>
      </div>
      <div>
        {/* Wrap the "Signup" button in a Link component */}
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
