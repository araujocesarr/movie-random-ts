import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { MovieData } from "../types";

const API_KEY = "e7d2420f199f417f09a0490ee7e36ee9"; // Reemplaza con tu API Key de TheMovieDB
const API_URL = `https://api.themoviedb.org/3`;

const TestCardComponent: React.FC = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`${API_URL}/movie/553301`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });

        const movie = response.data;
        const durationResponse = await axios.get(
          `${API_URL}/movie/${movie.id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );

        const duration = durationResponse.data.runtime;
        console.log(movie);

        const movieData: MovieData = {
          title: movie.title,
          overview: movie.overview,
          year: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : null,
          rating: movie.vote_average,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null,
          duration: duration
            ? `${Math.floor(duration / 60)}h ${duration % 60}m`
            : null,
        };
        console.log(movieData);

        setMovieData(movieData);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  return <div>{movieData ? <Card data={movieData} /> : <p>Loading...</p>}</div>;
};

export default TestCardComponent;
