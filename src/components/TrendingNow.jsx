import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCart } from "../context/CartContext";

import samsung from "../assets/samsung.jpg";
import shoe from "../assets/shoe.jpeg";
import dumbbell from "../assets/dumbbell.webp";

const products = [
  {
    id: 101,
    name: "Phone Case",
    desc: "Protective phone case with shock absorption and slim design",
    price: 19.99,
    img: samsung,
    category: "Electronics",
  },
  {
    id: 102,
    name: "Shoe",
    desc: "Lightweight running shoes with breathable mesh and superior cushioning",
    price: 89.99,
    img: shoe,
    category: "Footwear",
  },
  {
    id: 103,
    name: "Dumbbell",
    desc: "Build muscle with dumbbell",
    price: 129.99,
    img: dumbbell,
    category: "Sports",
  },
];

const TrendingNow = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { addToCart } = useCart(); // ← use your context

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.2 }}
        className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-gray-800"
      >
        🔥 Trending Now
      </motion.h2>

      {/* Only shows the local products array */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 lg:px-0">
        {products.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden group">
              <motion.img
                src={item.img}
                alt={item.name}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                whileHover={{ rotate: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500"></div>
            </div>

            {/* Content */}
            <div className="p-5 text-left">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-gray-900">
                  ₹{Math.round(item.price * 83.5).toFixed(2)}
                </span>

                <motion.button
                  onClick={() => addToCart(item)} // ← working context add
                  whileHover={{ scale: 1.05 }}
                  className="bg-black text-white px-5 py-1.5 rounded-full text-sm hover:bg-gray-800 transition-all duration-300"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingNow;
