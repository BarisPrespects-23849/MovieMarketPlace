// src/services/api.js
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const api = {
  async getTrending() {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results.map(item => ({
        id: item.id,
        title: item.title || item.name,
        media_type: 'movie', // Trending movies
        poster_path: item.backdrop_path 
          ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` 
          : null,
        vote_average: item.vote_average,
        price: 7.0,
        change: 0,
      }));
    } catch (error) {
      console.error('Error fetching trending:', error);
      return [];
    }
  },
  async searchMovies(query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.results.map((item) => ({
        id: item.id,
        title: item.title || item.name,
        media_type: item.media_type,
        poster_path: item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : null,
        vote_average: item.vote_average,
        price: 7.0,
        change: 0,
      }));
    } catch (error) {
      console.error("Error in searchMovies:", error);
      return [];
    }
  },
  async getMovieDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      return {
        ...data,
        poster_path: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : null,
      };
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  },
  async getSeriesDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      return {
        ...data,
        title: data.name,
        poster_path: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : null,
      };
    } catch (error) {
      console.error("Error fetching series details:", error);
      throw error;
    }
  },
  async getPopularMovies() {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      return data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        vote_average: movie.vote_average,
        price: 7.0,
        change: 0,
      }));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      return [];
    }
  },
  async getPopularSeries() {
    try {
      const response = await fetch(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`);
      const data = await response.json();
      return data.results.map((show) => ({
        id: show.id,
        title: show.name,
        poster_path: show.poster_path
          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
          : null,
        vote_average: show.vote_average,
        price: 7.0,
        change: 0,
      }));
    } catch (error) {
      console.error("Error fetching popular series:", error);
      return [];
    }
  },
};

export default api;
