import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import PropTypes from 'prop-types';
import api from "../services/api";
import MediaCard from "../components/MediaCard";
import Loading from "../components/Loading";
import ErrorBoundary from "../components/ErrorBoundary";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const decodedQuery = decodeURIComponent(query);

    const fetchResults = async () => {
      try {
        const data = await api.search(decodedQuery);
        if (isMounted) {
          setResults(data.filter(item => 
            item.media_type === 'movie' || item.media_type === 'tv'
          ));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchResults();
    return () => {
      isMounted = false;
    };
  }, [query]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4" role="alert">Error: {error}</div>;

  const decodedQuery = decodeURIComponent(query);

  return (
    <main className="pt-20 px-4 min-h-screen bg-gray-900">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Search Results for "{decodedQuery}"
        </h1>
      </header>
      
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          {results.length > 0 ? (
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map(item => (
                <MediaCard
                  key={item.id}
                  item={item}
                  mediaType={item.media_type}
                />
              ))}
            </section>
          ) : (
            <p className="text-gray-400 text-center py-20">
              No results found for "{decodedQuery}"
            </p>
          )}
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default SearchResults;
