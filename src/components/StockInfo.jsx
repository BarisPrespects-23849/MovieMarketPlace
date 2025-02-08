import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StockInfo = ({ stock }) => {
  const chartData = stock.historicalData.map((price, index) => ({
    name: `${5-index}d`,
    price
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">${stock.price}</h3>
          <p className={`${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Volume: {stock.volume}</p>
          <p className="text-gray-400">Market Cap: {stock.marketCap}</p>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#10B981" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

StockInfo.propTypes = {
  stock: PropTypes.shape({
    price: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
    marketCap: PropTypes.string.isRequired,
    historicalData: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};

export default StockInfo;
