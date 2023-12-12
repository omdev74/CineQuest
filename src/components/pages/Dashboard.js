import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import { CircleUserRound } from "lucide-react";
import MovieList from "../MovieList/MovieList";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // playlist
  const [data, setData] = useState(null);

  const apiKey = "9ac88c47d4d586add1154d12a91509f7";
  const tmdbEndpoint = "https://api.themoviedb.org/3/trending/movie/week";

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = getCookie("userToken");

    if (!token) {
      navigate("/login");
    }

    // Fetch user profile data from the API
    fetchUserProfile(token);

    fetch(`${tmdbEndpoint}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate]);


  const fetchUserProfile = (token) => {
    fetch("https://moviesearch-api.onrender.com/user/profile", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        // Update the state with user data
        setUserData(userData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <Container maxWidth="lg" id="DashboardContainer">
      <Typography variant="h4" gutterBottom>
        Movie App Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your movie app dashboard. Here, you can manage your playlists,
        change your password, edit your profile, and update your profile photo.
      </Typography>

      <Paper elevation={3} mt={3} className="dashboard-section">
        <Box p={2}>
          <Typography variant="h6">My Playlists</Typography>
          <MovieList movies={data} numberOfMovies={5} excludeFirst />
        </Box>
      </Paper>

      <Divider className="dashboard-divider" />

      <Paper elevation={3} mt={3} className="dashboard-section">
        <Box p={2} className="dashboard-form">
          <Typography variant="h6">Change Password</Typography>
          <TextField label="Current Password" type="password" fullWidth mt={2} />
          <TextField label="New Password" type="password" fullWidth mt={2} />
          <TextField label="Confirm New Password" type="password" fullWidth mt={2} />
          <Button variant="contained" color="primary" fullWidth mt={2}>
            Change Password
          </Button>
        </Box>
      </Paper>

      <Divider className="dashboard-divider" />

      <Paper elevation={3} mt={3} className="dashboard-section">
        <Box p={2} className="dashboard-form">
          <Typography variant="h6">Edit Profile</Typography>
          <TextField label="Full Name" fullWidth mt={2} />
          <TextField label="Email" fullWidth mt={2} />
          <TextField label="Username" fullWidth mt={2} />
          <Button variant="contained" color="primary" fullWidth mt={2}>
            Save Changes
          </Button>
        </Box>
      </Paper>

      <Divider className="dashboard-divider" />

      <Paper elevation={3} mt={3} className="dashboard-section">
        <Box p={2} className="dashboard-form">
          <Typography variant="h6">User Data</Typography>
          {userData && (
            <>
              {CircleUserRound ? (
                <CircleUserRound
                  className="user-icon ellipse"
                  title="Click for profile"
                  color="white"

                />
              ) : (
                <img
                  className="ellipse"
                  alt="Ellipse"
                  src="./images/ellipse-1.png"
                  title="Click for profile"

                />
              )}
              <Typography variant="body1" sx={{ color: 'white' }}>Username: {userData.data.username || "N/A"}</Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>Email: {userData.data.email || "N/A"}</Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>Member since: {userData.data.createdAt || "N/A"}</Typography>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;