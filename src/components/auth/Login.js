import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const token = getCookie("userToken");

    if (token) {
      // If a user is already logged in, you can redirect them to the dashboard.
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true before making the request

      const response = await fetch(
        "https://moviesearch-api.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Login failed with status code:", response.status);
      } else {
        const data = await response.json();

        // Save the user token in a cookie
        setCookie("userToken", data.token);

        // Redirect to the dashboard for a successful login
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };

  // Function to get a cookie by name
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Function to set a cookie
  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/`;
  };

  return (
    <div className="login-container">
      <div className="left-side-image"></div>
      <form onSubmit={handleSubmit} className="form-login">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <Link to="/signup">Not Registered? Click here</Link>

        {/* Conditionally render the spinner based on the loading state */}
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default Login;
