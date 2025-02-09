// src/pages/SearchResults.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import MediaCard from "../components/MediaCard";
import { startPriceSimulation } from "../services/priceSimulation";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await api.searchMovies(query);
        setResults(data);
        // Start dynamic pricing simulation for these items.
        startPriceSimulation(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!results.length)
    return <div className="p-4">No results found for "{query}"</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((item) => (
          <MediaCard key={item.id} item={item} mediaType={item.media_type} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
