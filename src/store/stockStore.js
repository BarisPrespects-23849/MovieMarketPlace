// src/store/stockStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStockStore = create(
  persist(
    (set) => ({
      balance: 1000.00,
      portfolio: {},
      
      buyStock: (stock, quantity) => set((state) => {
        const totalCost = stock.price * quantity;
        if (totalCost > state.balance) {
          alert('Insufficient funds!');
          return state;
        }
        
        return {
          balance: +(state.balance - totalCost).toFixed(2),
          portfolio: {
            ...state.portfolio,
            [stock.id]: {
              ...stock,
              quantity: (state.portfolio[stock.id]?.quantity || 0) + quantity
            }
          }
        };
      }),

      sellStock: (stock, quantity) => set((state) => {
        const owned = state.portfolio[stock.id]?.quantity || 0;
        if (quantity > owned) {
          alert('Not enough shares!');
          return state;
        }

        const newQuantity = owned - quantity;
        const updatedPortfolio = { ...state.portfolio };
        
        if (newQuantity === 0) {
          delete updatedPortfolio[stock.id];
        } else {
          updatedPortfolio[stock.id] = {
            ...updatedPortfolio[stock.id],
            quantity: newQuantity
          };
        }

        return {
          balance: +(state.balance + (stock.price * quantity)).toFixed(2),
          portfolio: updatedPortfolio
        };
      })
    }),
    { name: 'stock-store' }
  )
);
