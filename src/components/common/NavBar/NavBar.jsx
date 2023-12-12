import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, CircleUserRound, LogIn, Pointer } from "lucide-react";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleUserIconClick = () => {
    // Navigate to the dashboard page
    navigate("/dashboard");
  };

  const handleLogout = () => {
    // Clear all cookies or perform any other logout actions
    navigate("/logout");
  };
  const handleLogin = () => {
    // Clear all cookies or perform any other logout actions
    navigate("/login");
  };

  const userData = getCookie("userData");

  return (
    <div className="navbar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search movies..."
        autoComplete="off"
      />
      {userData ? (
        <div className="profileIndicator">
          <div className="text-wrapper">{userData}</div>
          {CircleUserRound ? (
            <CircleUserRound
              className="user-icon ellipse"
              title="Click for profile"
              onClick={handleUserIconClick}
            />
          ) : (
            <img
              className="ellipse"
              alt="Ellipse"
              src="./images/ellipse-1.png"
              title="Click for profile"
              onClick={handleUserIconClick}
            />
          )}
          <LogOut
            className="logout-icon"
            title="Log Out"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <div className="profileIndicator">
          <div onClick={handleLogin}>
            <h2>Login</h2>
            <LogIn className="login-icon" title="Log In" cursor={"pointer"}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
