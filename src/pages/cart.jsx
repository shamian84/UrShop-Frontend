import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => navigate("/checkout");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-gray-500 text-center py-20 text-lg">
          🛒 Your cart is empty
          <br />
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="flex flex-col gap-4 flex-1">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow rounded-2xl p-4 gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold truncate">{item.name}</h2>
                      <p className="text-gray-500 text-sm">
                        {item.category || "General"}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            item.qty > 1 && removeFromCart(item.id, "decrease")
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right w-full sm:w-auto flex flex-col sm:items-end gap-2">
                    <p className="text-lg font-bold">
                      ₹{(item.price * item.qty * 83.5).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 flex items-center gap-1 hover:text-red-700 transition-colors duration-200 text-sm"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow rounded-2xl p-6 w-full md:w-80 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{(subtotal * 83.5).toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>₹{(subtotal * 83.5).toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-2 text-gray-600 hover:text-black transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
