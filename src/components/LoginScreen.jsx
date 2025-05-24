import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Login successful!");
        localStorage.setItem("userEmail", email);
        navigate("/profile");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="login-content">
      <h2>Signin to your PopX account</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      <form onSubmit={handleLogin}>
        <label>Email Address</label>
        <input type="email" placeholder="Enter email address" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="login-btn" type="submit">Login</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default LoginScreen;