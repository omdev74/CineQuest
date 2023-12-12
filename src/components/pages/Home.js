import React, { useEffect, useState } from "react";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";
import { apiClient } from "../../api/api";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiKey = '9ac88c47d4d586add1154d12a91509f7';
    const tmdbEndpoint = 'https://api.themoviedb.org/3/trending/movie/week';

    apiClient
      .get("/movies")
      .then((res) => {
        console.log(res?.data?.movies);
        setData(res?.data?.movies);
      })
      .catch((error) => {
        console.log(error);
        alert(`Error, ${error.message}`);
      });
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome to CineQuest!</h2>
      <p>Discover and explore the world of movies.</p>
      <br />
      <br />

      {data && data.length > 0 ? (
        <>
          <FeaturedMovie movie={data[0]} />
          <br />
          <MovieList movies={data} numberOfMovies={17} excludeFirst />
          <Pagination currentPage={1} setPage={1} totalPages={data.length} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Home;
