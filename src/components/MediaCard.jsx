// src/components/MediaCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePriceStore, startPriceSimulation } from "../services/priceSimulation";
import { useStockStore } from "../store/stockStore";

const MediaCard = ({ item, mediaType }) => {
  const [quantity, setQuantity] = useState(1);
  const priceData = usePriceStore((state) => state.prices[item.id]);
  const { buyStock, sellStock, portfolio } = useStockStore();
  
  const currentPrice = priceData?.price || item.price || 7.0;
  const priceChange = priceData?.change || 0;
  const ownedShares = portfolio[item.id]?.quantity || 0;
  
  useEffect(() => {
    const intervalId = startPriceSimulation([item]);
    return () => clearInterval(intervalId);
  }, [item.id]);
  
  const handleBuy = () => {
    if (quantity > 0) {
      buyStock({ ...item, price: currentPrice }, quantity);
      setQuantity(1);
    }
  };

  const handleSell = () => {
    if (quantity > 0 && ownedShares >= quantity) {
      sellStock({ ...item, price: currentPrice }, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={item.poster_path}
          alt={item.title}
          className="w-full aspect-[2/3] object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-lg text-sm">
          {item.vote_average?.toFixed(1)}/10
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{item.title}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold">${currentPrice.toFixed(2)}</span>
          <span className={`${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
            {priceChange >= 0 ? "+" : ""}{Math.abs(priceChange).toFixed(2)}%
          </span>
        </div>
        <div className="text-sm text-gray-400 mb-3">Owned: {ownedShares} shares</div>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full bg-gray-700/50 rounded px-3 py-2 mb-3"
        />
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleBuy}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm"
          >
            Buy
          </button>
          <button
            onClick={handleSell}
            disabled={ownedShares < quantity}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            Sell
          </button>
          <Link
            to={`/${mediaType}/${item.id}`}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
