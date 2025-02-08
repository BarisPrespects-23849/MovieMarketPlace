// src/pages/StockDetails.jsx
import { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import Loading from "../components/Loading";
import api from "../services/api";
import { usePriceStore } from "../services/priceSimulation";

const StockDetails = () => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const priceData = usePriceStore((state) => state.prices);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const data = await api.getMovieDetails(id);
        setStock({
          ...data,
          price: priceData[data.id]?.price || 7.00,
          change: priceData[data.id]?.change || 0
        });
      } catch (error) {
        console.error("Error fetching stock details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!stock) return <div>Stock not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{stock.title}</h1>
      <StockChart stock={stock} />
    </div>
  );
};

export default StockDetails;
