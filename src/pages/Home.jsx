// src/pages/Home.jsx
import { useRotatingContent } from '../hooks/useRotatingContent';
import MovieList from '../components/MovieList';
import SeriesList from '../components/SerisList';
import HeroBanner from '../components/HeroBanner';
import Loading from '../components/Loading';

const Home = () => {
  const { movies, series, loading, error } = useRotatingContent();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <HeroBanner />
      <div className="space-y-8 p-4">
        <MovieList movies={movies} />
        <SeriesList series={series} />
      </div>
    </>
  );
};

export default Home;
