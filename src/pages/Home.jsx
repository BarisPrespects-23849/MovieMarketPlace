// src/pages/Home.jsx
import { useRotatingContent } from '../hooks/useRotatingContent';
import MovieList from '../components/MovieList';
import SeriesList from '../components/SerisList';
import HeroBanner from '../components/HeroBanner';
import Loading from '../components/Loading';

const Home = () => {
  const { movies, series, loading } = useRotatingContent();
  
  if (loading) return <Loading />;

  return (
    <section>
      <HeroBanner movie={movies[0]} /> {/* Add hero banner with first movie */}
      <div className="space-y-8 p-4">
        <MovieList movies={movies} />
        <SeriesList series={series} />
      </div>
    </section>
  );
};

export default Home;
