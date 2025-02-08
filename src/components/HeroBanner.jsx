
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const HeroBanner = () => {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await api.getTrending();
        setTrending(data[0]); 
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading || !trending) return null;

  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <img
          src={trending.poster_path}
          alt={trending.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{trending.title}</h1>
        <Link 
          to={`/movie/${trending.id}`}
          className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
