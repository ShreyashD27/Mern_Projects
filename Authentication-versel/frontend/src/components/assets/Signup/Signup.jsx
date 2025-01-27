import React, { useState } from "react";
import "./Signup.css";
import { validateSignupForm } from "./validation";

import user_icon from "../images/user.png";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import phone_icon from "../images/phone.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateSignupForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        // Make a POST request to the backend API
        const response = await fetch(
          "https://authentication-vercel-back.vercel.app/api/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
          alert("Signup successful!");

          // Clear the form after successful submission
          setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          const error = await response.json();
          console.error("Error:", error);
          alert(error.error || "Signup failed!");
        }
      } catch (err) {
        console.error("Request error:", err);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <img src={user_icon} alt="User Icon" className="input-icon" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>

        <div className="input-group">
          <img src={email_icon} alt="Email Icon" className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="input-group">
          <img src={phone_icon} alt="Phone Icon" className="input-icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="input-group">
          <img src={password_icon} alt="Password Icon" className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <div className="input-group">
          <img
            src={password_icon}
            alt="Confirm Password Icon"
            className="input-icon"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="Signup-button">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div className="signup-footer">
  <p>
    Already a user? <a href="/login" className="login-link">Login</a>
  </p>
</div>

    </div>
  );
};

export default Signup;
