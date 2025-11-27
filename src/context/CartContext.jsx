/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id, action) => {
    setCartItems((prev) => {
      if (action === "decrease") {
        // Decrease quantity
        return prev
          .map((item) => {
            if (item.id === id) {
              return { ...item, qty: Math.max(item.qty - 1, 0) };
            }
            return item;
          })
          .filter((item) => item.qty > 0);
      } else {
        // Complete removal
        return prev.filter((item) => item.id !== id);
      }
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
