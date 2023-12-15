// Login.js
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import './style.css';

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const formData = new FormData();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await axios.post('http://localhost:8000/token/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const accessToken = response.data.access;


      console.log('Login successful! Token:', accessToken);
      // Handle the token or response data as needed
      localStorage.setItem("accessToken", accessToken);
      navigate("/");
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={credentials.password}
        onChange={handleInputChange}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
