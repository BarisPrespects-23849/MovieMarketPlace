// src/pages/StockMarket.jsx
import { useState, useEffect } from "react";
import MediaCard from "../components/MediaCard";
import api from "../services/api";
import { startPriceSimulation } from "../services/priceSimulation";

import Loading from "../components/Loading";

const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const moviesData = await api.getPopularMovies();
        setStocks(moviesData);
        const cleanup = startPriceSimulation(moviesData);
        return () => clearInterval(cleanup);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stocks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!stocks.length) return <div className="p-4">No stocks available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Stock Exchange</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stocks.map((stock) => (
          <MediaCard 
            key={stock.id} 
            item={stock} 
            mediaType="movie"
          />
        ))}
      </div>
    </div>
  );
};

export default StockMarket;
