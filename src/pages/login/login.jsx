import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from "../../services/user_services";
import { useAuth } from '../../utils/authContext';
import "./login.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
})

const auth = useAuth()
const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault();
  userService.login(credentials)
    .then((res) => {
      console.log(res.data);
      // Assuming the response contains the token, navigate to /dashboard
      auth.setUsername(credentials.username);
      window.localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    })
    .catch((err) => {
      console.error("Login Error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        window.alert(err.response.data.error);
      } else {
        window.alert("An error occurred during login.");
      }
    });
}
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <div className="formGroup">
          <label>Username</label>
          <input className="loginInput" type="text" placeholder="Enter your username"  
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>

        <div className="formGroup">
          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter your password"
           value={credentials.password}
           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>

        <button className="loginButton" onClick={handleSubmit}>
          LOGIN
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">REGISTER</Link>
      </button>
    </div>
  )
}
