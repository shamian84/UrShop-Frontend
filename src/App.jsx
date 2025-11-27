import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/cart";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
