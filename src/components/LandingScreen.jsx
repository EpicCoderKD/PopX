import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingScreen.css";

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-content">
      <h2>Welcome to PopX</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      <button className="primary-btn" onClick={() => navigate("/signup")}>
        Create Account
      </button>
      <button className="secondary-btn" onClick={() => navigate("/login")}>
        Already Registered? Login
      </button>
    </div>
  );
};

export default LandingScreen;