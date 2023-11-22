// Dashboard new updated file
import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Grid, Button, TextField, Avatar, Divider } from "@mui/material";
import MovieList from "../MovieList/MovieList";
import "./Dashboard.css";

// Dashboard Component
const Dashboard = () => {
  const [data, setData] = useState(null);
  const apiKey = '9ac88c47d4d586add1154d12a91509f7';
  const tmdbEndpoint = 'https://api.themoviedb.org/3/trending/movie/week';

  useEffect(() => {
    console.log("useEffect");
    fetch(`${tmdbEndpoint}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg" id="DashboardContainer">
      <Typography variant="h4" gutterBottom style={{ color: "#ffffff", marginBottom: "20px" }}>
        Movie App Dashboard
      </Typography>
      <Typography variant="body1" style={{ color: "#ffffff", marginBottom: "10px" }}>
        Welcome to your movie app dashboard. Here, you can manage your playlists, change your password, edit your profile, and update your profile photo.
      </Typography>

{/* playlist section */}
      <Paper elevation={3} mt={3} sx={{ backgroundColor: "#1f1e24",border:"solid white 1px" }}>
        <Box p={2} style={{ marginBottom: "15px" }}>
          <Typography variant="h6" style={{ color: "#ffffff" }}>My Playlists</Typography>
          <MovieList movies={data} numberOfMovies={5} excludeFirst />
        </Box>
      </Paper>
      <Divider
        style={{
          color: "white",
          border: "1px solid #444444",
        }}
      />
{/* password change section */}
      <Paper elevation={3} mt={3} sx={{ backgroundColor: "#1f1e24",border:"solid white 1px" }}>
        <Box p={2} className="DashboardForm">
          <Typography variant="h6" style={{ color: "#ffffff" }}>Change Password</Typography>
          <TextField label="Current Password" type="password" fullWidth mt={2} />
          <TextField label="New Password" type="password" fullWidth mt={2} />
          <TextField label="Confirm New Password" type="password" fullWidth mt={2} />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: "15px", backgroundColor: "#3f51b5", color: "#ffffff" }}>
            Change Password
          </Button>
        </Box>
      </Paper>
      <Divider
        style={{
          color: "white",
          border: "1px solid #444444",
        }}
      />

      <Paper elevation={3} mt={3} sx={{ backgroundColor: "#1f1e24",border:"solid white 1px" }}>
        <Box p={2} className="DashboardForm">
          <Typography variant="h6" style={{ color: "#ffffff" }}>Edit Profile</Typography>
          <TextField label="Full Name" fullWidth mt={2} />
          <TextField label="Email" fullWidth mt={2} />
          <TextField label="Username" fullWidth mt={2} />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: "15px", backgroundColor: "#3f51b5", color: "#ffffff" }}>
            Save Changes
          </Button>
        </Box>
      </Paper>
      <Divider
        style={{
          color: "white",
          border: "1px solid #444444",
        }}
      />

      <Paper elevation={4} mt={3} sx={{ backgroundColor: "#1f1e24",border:"solid white 1px" }}>
        <Box p={2} className="DashboardForm">
          <Typography variant="h6" style={{ color: "#ffffff" }}>User Data</Typography>
          <Avatar alt="Your Profile Photo" src="./images/your-profile-photo.jpg" sx={{ width: 150, height: 150, marginTop: 2, marginBottom: 2 }} />
          <Typography variant="body1" style={{ color: "#ffffff" }}>
            Full Name: {sessionStorage.getItem("fullName") || "N/A"}
          </Typography>
          <Typography variant="body1" style={{ color: "#ffffff" }}>
            Email: {sessionStorage.getItem("email") || "N/A"}
          </Typography>
          <Typography variant="body1" style={{ color: "#ffffff" }}>
            Username: {sessionStorage.getItem("username") || "N/A"}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
