import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const StockChart = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      foreColor: '#fff',
      background: 'transparent'
    },
    xaxis: {
      categories: ['5d', '4d', '3d', '2d', '1d'],
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toFixed(2)}`
      }
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 5
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#10B981'],
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `$${value.toFixed(2)}`
      }
    }
  };

  const series = [{
    name: 'Stock Price',
    data: data
  }];

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <ReactApexChart 
        options={options} 
        series={series} 
        type="line" 
        height={350} 
      />
    </div>
  );
};

StockChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default StockChart;
