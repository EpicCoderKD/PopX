import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingScreen from "./components/LandingScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import ProfileScreen from "./components/ProfileScreen";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <div className="mobile-frame">
        <Router>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;