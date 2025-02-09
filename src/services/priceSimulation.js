// src/services/priceSimulation.js
import { create } from "zustand";

export const usePriceStore = create((set) => ({
  prices: {},
  updatePrice: (id, newPrice, change) =>
    set((state) => ({
      prices: {
        ...state.prices,
        [id]: { price: newPrice, change },
      },
    })),
}));

export const startPriceSimulation = (items) => {
  items.forEach((item) => {
    if (!usePriceStore.getState().prices[item.id])
      usePriceStore.getState().updatePrice(item.id, 7.0, 0);
  });
  return setInterval(() => {
    items.forEach((item) => {
      const currentPrice = usePriceStore.getState().prices[item.id]?.price || 7.0;
      const change = (Math.random() - 0.5) * 0.04; // -2% to +2%
      const newPrice = Math.max(1, +(currentPrice * (1 + change)).toFixed(2));
      const percentChange = +(((newPrice - currentPrice) / currentPrice) * 100).toFixed(2);
      usePriceStore.getState().updatePrice(item.id, newPrice, percentChange);
    });
  }, 2000);
};
