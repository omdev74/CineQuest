// MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Tooltip,
  Rating,
  Grid,
  Paper,
  Box,
  Divider,
  Chip,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@mui/material";

// import ReviewList from "../ReviewList/ReviewList";
import { apiClient } from "../../api/api";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);


  useEffect(() => {
    const tmdbDetailsEndpoint = `https://moviesearch-api.onrender.com/movies/${movieId}`;
    
    fetch(tmdbDetailsEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedDetails) => {
        setMovieDetails(fetchedDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });


      apiClient
      .get(`/movies/${movieId}`)
      .then((res) => {
        console.log(res?.data);
        setMovieDetails(res?.data);
        // setData(res?.data?.movies);
      })
      .catch((error) => {
        console.log(error);
        // alert(`Error, ${error.message}`);
      });

  }, [movieId]);

  if (!movieDetails) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        {movieDetails.title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            p={2}
            style={{ textAlign: "left", padding: "40px" }}
          >
            <Typography variant="h6" mb={2}>
              Overview
            </Typography>
            <Typography variant="body1" mb={2}>
              {movieDetails.overview}
            </Typography>

            <Divider mb={2} />

            <Typography variant="h6" mb={2}>
              Genres
            </Typography>
            <Box>
              {movieDetails.genre.map((genre) => (
                <Chip key={genre} label={genre} mr={1} mb={1} />
              ))}
            </Box>

            <Divider mb={2} />

            <Typography variant="h6" mb={2}>
              Release Date
            </Typography>
            <Typography variant="body1" mb={2}>
              {movieDetails.release_date}
            </Typography>


            <Divider mb={2} />

            <Typography variant="h6" mb={2}>
              Vote Average
            </Typography>
            <Tooltip title={`${movieDetails.vote_average} / 10`}>
              <div>
                <Rating
                  readOnly
                  value={movieDetails.vote_average / 2}
                  precision={0.1}
                />
              </div>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>

      <Paper>
        <Grid style={{ marginTop: "50px" }} container spacing={1}>
          {movieDetails?.cast?.map((c) => (
            <Grid key={c?._id} xs={6} md={4}>
              <Link href={`/artist/${c?.tmdbId}`}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt={c?.name}
                      src={`https://image.tmdb.org/t/p/w500/${c?.profile_path}`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={c?.name} secondary={c?.character} />
                </ListItem>{" "}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>


     
            

    </Box >
  );
};

export default MovieDetails;
