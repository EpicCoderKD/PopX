import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupScreen.css";

const SignupScreen = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "no"
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Signup successful!");
        localStorage.setItem("userEmail", form.email); // Store email for profile
        navigate("/profile");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="signup-content">
      <h2>Create your PopX account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name*</label>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <label>Phone number*</label>
        <input type="text" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
        <label>Email address*</label>
        <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} />
        <label>Password*</label>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <label>Company name</label>
        <input type="text" name="company" placeholder="Company name" value={form.company} onChange={handleChange} />
        <div className="radio-group">
          <span>Are you an Agency?*</span>
          <label>
            <input type="radio" name="agency" value="yes" checked={form.agency === "yes"} onChange={handleChange} /> Yes
          </label>
          <label>
            <input type="radio" name="agency" value="no" checked={form.agency === "no"} onChange={handleChange} /> No
          </label>
        </div>
        <button className="signup-btn" type="submit">Create Account</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default SignupScreen;