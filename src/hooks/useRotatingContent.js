// src/hooks/useRotatingContent.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useRotatingContent = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [moviesData, seriesData] = await Promise.all([
          api.getPopularMovies(),
          api.getPopularSeries()
        ]);
        setMovies(moviesData);
        setSeries(seriesData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { movies, series, loading, error };
};
