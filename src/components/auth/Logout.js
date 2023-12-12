import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Ban } from "lucide-react";
import "./Logout.css";


const Logout = () => {
    const navigate = useNavigate();

    // Function to clear all cookies
    const clearAllCookies = () => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
    };

    const handleLogout = () => {
        // Clear all cookies
        clearAllCookies();

        // Navigate to the home page
        navigate("/");
    };

    const handleCancel = () => {
        // Navigate to the home page
        navigate("/");
    };


    return (
        <div className="logout-container" style={{textAlign:"center"}} >
            <h2>Are you sure?</h2>
            {/* You can add additional elements or messages here */}
            <button onClick={handleLogout} style={{
                backgroundColor: "#ac1b1b", padding: "1vh", m: "1px"
            }}>
                <LogOut className="logout-icon" />
                Logout
            </button>
            <button onClick={handleCancel} style={{
                backgroundColor: "white", padding: "1vh", m: "1px"
            }}>
                <Ban className="logout-icon" />
                Cancel
            </button>
        </div>
    );
};

export default Logout;
