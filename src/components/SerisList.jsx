// src/components/SeriesList.jsx
import { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import Loading from './Loading';
import api from '../services/api';

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await api.getPopularSeries();
        setSeries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Popular TV Series</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {series.map((show) => (
          <MediaCard 
            key={show.id} 
            item={show} 
            mediaType="tv"
          />
        ))}
      </div>
    </div>
  );
};

export default SeriesList;
