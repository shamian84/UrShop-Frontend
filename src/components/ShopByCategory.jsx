import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Laptop, ShoppingBag, Home, Dumbbell } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: (
      <Laptop
        size={50}
        className="text-blue-500 group-hover:text-blue-600 transition-colors"
      />
    ),
    color: "from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100",
    glow: "shadow-blue-400/40",
  },
  {
    id: 2,
    name: "Sports",
    icon: (
      <Dumbbell
        size={50}
        className="text-green-500 group-hover:text-green-600 transition-colors"
      />
    ),
    color: "from-green-100 to-green-50 hover:from-green-200 hover:to-green-100",
    glow: "shadow-green-400/40",
  },
  {
    id: 3,
    name: "Accessories",
    icon: (
      <ShoppingBag
        size={50}
        className="text-pink-500 group-hover:text-pink-600 transition-colors"
      />
    ),
    color: "from-pink-100 to-pink-50 hover:from-pink-200 hover:to-pink-100",
    glow: "shadow-pink-400/40",
  },
  {
    id: 4,
    name: "Home & Kitchen",
    icon: (
      <Home
        size={50}
        className="text-orange-500 group-hover:text-orange-600 transition-colors"
      />
    ),
    color:
      "from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100",
    glow: "shadow-orange-400/40",
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-16 px-6 text-center bg-gradient-to-b from-gray-50 to-white">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800"
      >
        🛍️ Shop by Category
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto px-4 lg:px-0">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: `0 8px 25px ${cat.glow}`,
            }}
            className={`group bg-gradient-to-br ${cat.color} border border-gray-200 shadow-md rounded-2xl py-8 md:py-10 px-4 md:px-6 flex flex-col items-center justify-center cursor-pointer transform transition-all duration-300`}
          >
            {/* Animated Icon */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              {cat.icon}
            </motion.div>

            <p className="font-semibold text-gray-800 text-lg group-hover:scale-105 transition-transform">
              {cat.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
