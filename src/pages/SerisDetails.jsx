// src/pages/SeriesDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { usePriceStore, startPriceSimulation } from '../services/priceSimulation';
import { useStockStore } from '../store/stockStore';

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const priceData = usePriceStore((state) => state.prices[id]);
  const { buyStock, sellStock, portfolio } = useStockStore();

  const currentPrice = priceData?.price || 7.00;
  const priceChange = priceData?.change || 0;
  const ownedShares = portfolio[id]?.quantity || 0;

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const data = await api.getSeriesDetails(id);
        setSeries(data);
        startPriceSimulation([{ id: parseInt(id), ...data }]);
      } catch (error) {
        console.error('Error fetching series details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
    return () => clearInterval(startPriceSimulation); // Cleanup simulation on unmount
  }, [id]);

  const handleBuy = () => {
    if (quantity > 0 && series) {
      buyStock({ ...series, price: currentPrice }, quantity);
      setQuantity(1); // Reset quantity after purchase
    }
  };

  const handleSell = () => {
    if (quantity > 0 && ownedShares >= quantity && series) {
      sellStock({ ...series, price: currentPrice }, quantity);
      setQuantity(1); // Reset quantity after sale
    }
  };

  if (loading) return <Loading />;
  if (!series) return <div className="text-center py-8">TV Show not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={series.poster_path}
            alt={series.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
              <span className={`text-lg ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
            <div className="text-gray-400 mb-4">Owned: {ownedShares} shares</div>
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
          <h1 className="text-4xl font-bold mb-4">{series.title}</h1>
          <p className="text-gray-300 mb-6">{series.overview}</p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">First Air Date</h3>
              <p>{series.first_air_date}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Rating</h3>
              <p>{series.vote_average}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
