// src/pages/MovieDetails.jsx (Similar structure for SeriesDetails.jsx)
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { usePriceStore, startPriceSimulation } from '../services/priceSimulation';
import { useStockStore } from '../store/stockStore';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const priceData = usePriceStore((state) => state.prices[id]);
  const { buyStock, sellStock, portfolio } = useStockStore();
  
  const currentPrice = priceData?.price || 7.00;
  const priceChange = priceData?.change || 0;
  const ownedShares = portfolio[id]?.quantity || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMovieDetails(id);
        setMovie(data);
        // Start price simulation for this movie
        const cleanup = startPriceSimulation([{ id: parseInt(id), ...data }]);
        return () => clearInterval(cleanup);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBuy = () => {
    if (quantity > 0 && movie) {
      buyStock({ ...movie, price: currentPrice }, quantity);
      setQuantity(1);
    }
  };

  const handleSell = () => {
    if (quantity > 0 && ownedShares >= quantity && movie) {
      sellStock({ ...movie, price: currentPrice }, quantity);
      setQuantity(1);
    }
  };

  if (loading) return <Loading />;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
          
          {/* Trading Section */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
              <span className={`text-lg ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
            
            <div className="text-gray-400 mb-4">
              Owned: {ownedShares} shares
            </div>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-gray-700 rounded px-4 py-3 mb-4 text-lg"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleBuy}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold"
              >
                Buy Shares
              </button>
              <button
                onClick={handleSell}
                disabled={ownedShares < quantity}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-lg font-semibold disabled:opacity-50"
              >
                Sell Shares
              </button>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-6">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Release Date</h3>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Rating</h3>
              <p>{movie.vote_average}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
