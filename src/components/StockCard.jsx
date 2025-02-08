import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StockCard = ({ stock }) => {
  const [shares, setShares] = useState(0);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img 
          src={stock.poster_path} 
          alt={stock.title} 
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-full">
          <span className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{stock.title}</h3>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">${stock.price.toFixed(2)}</span>
        <span className="text-gray-400">Vol: {stock.volume}</span>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          min="0"
          value={shares}
          onChange={(e) => setShares(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Number of shares"
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => console.log('Buy:', shares, 'shares of', stock.title)}
            className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg 
                     transition-colors duration-200"
          >
            Buy
          </button>
          <Link 
            to={`/stock/${stock.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg 
                     transition-colors duration-200 text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

StockCard.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired
  }).isRequired
};

export default StockCard;
