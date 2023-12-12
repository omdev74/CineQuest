import React from "react";
import { Grid } from "@mui/material";
import Movie from "../Movie/Movie";
import "./MovieList.css";

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  // Ensure that movies is an array before attempting to slice it
  const movieArray = Array.isArray(movies) ? movies : [];

  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        flexWrap: "wrap",
      }}
    >
      {movieArray
        .slice(startFrom, numberOfMovies)
        .map((movie, i) => <Movie key={i} movie={movie} i={i} />)}
    </Grid>
  );
}

export default MovieList;
