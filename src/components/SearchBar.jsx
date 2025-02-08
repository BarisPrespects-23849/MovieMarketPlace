// src/components/SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const searchResults = await api.searchMovies(value);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search movies and TV shows..."
          className="w-full bg-gray-800 rounded-lg px-4 py-2"
        />
      </form>
      
      {loading && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg p-2 text-center">
          Searching...
        </div>
      )}
      
      {!loading && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-50">
          {results.slice(0, 5).map((result) => (
            <div
              key={result.id}
              onClick={() => {
                navigate(`/${result.media_type}/${result.id}`);
                setQuery('');
                setResults([]);
              }}
              className="p-2 hover:bg-gray-700 cursor-pointer"
            >
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
