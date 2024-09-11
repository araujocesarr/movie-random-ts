import axios from "axios";
import { MovieData, TMDBMovie } from "./types";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const getRandomPage = () => Math.floor(Math.random() * 500) + 1;

const fetchMovieDurationById = async (id: number): Promise<number | null> => {
  try {
    const response = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data.runtime;
  } catch (error) {
    console.error(`Error fetching movie duration with ID ${id}:`, error);
    return null;
  }
};

export const fetchRandomMovies = async (): Promise<MovieData[]> => {
  try {
    const randomPage = getRandomPage();
    const response = await axios.get(`${API_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: randomPage,
      },
    });

    console.log(response.data.results);

    const movies = await Promise.all(
      response.data.results.slice(0, 12).map(async (movie: TMDBMovie) => {
        const duration = await fetchMovieDurationById(movie.id);
        console.log(movie);
        return {
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
      })
    );

    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
