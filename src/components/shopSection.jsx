/* eslint-disable no-unused-vars */
import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardFade = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BenefitCard = memo(({ Icon, title, desc }) => (
  <motion.div
    variants={fadeUp}
    className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300"
  >
    <div className="text-indigo-600 mb-3 flex justify-center">
      <Icon size={36} />
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
  </motion.div>
));

const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const handleAdd = () => {
    const cartProduct = {
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      img: product.image || product.img,
      category: product.category || "General",
      description: product.description,
    };
    addToCart(cartProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      variants={cardFade}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          src={
            !imgError
              ? product.image || product.img
              : "https://img.ltwebstatic.com/images3_spmp/2025/01/01/0c/173571179563dcbbdd52192c34777a8ef948efca2b_thumbnail_900x.jpg"
          }
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-all duration-300 shadow-md"
        >
          {added ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600">
          ₹{Math.round(product.price * 83.5).toFixed(2)}
        </p>

        <div className="flex gap-3 mt-3">
          <button
            onClick={handleAdd}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-300"
          >
            Buy
          </button>
        </div>
      </div>
    </motion.div>
  );
});

// ---------- USE ONLY STATIC ARRAY ----------
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 50,
    image: "https://images.alphacoders.com/109/thumb-1920-1090856.jpg",
    category: "Electronics",
    description: "High-quality wireless headphones",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 950,
    image:
      "https://www.notebookcheck.net/fileadmin/Notebooks/MSI/special/13th_Gen/MSI_NB_Raider_GE78_photo02_6.png",
    category: "Computers",
    description: "High-performance laptop for gaming",
  },
  {
    id: 4,
    name: "Digital Camera",
    price: 300,
    image:
      "https://img.freepik.com/premium-photo/black-modern-digital-camera-body-with-black-camera-lens-white-background-camera-body_940029-38.jpg?w=2000",
    category: "Photography",
    description: "Capture stunning photos",
  },
  {
    id: 5,
    name: "Sneakers",
    price: 80,
    image:
      "https://freepngimg.com/thumb/shoes/28530-3-nike-shoes-transparent.png",
    category: "Footwear",
    description: "Comfortable sneakers",
  },
  {
    id: 6,
    name: "Backpack",
    price: 45,
    image:
      "https://img.freepik.com/premium-photo/classic-backpack-hd-8k-wallpaper-stock-photographic-image_853645-58007.jpg",
    category: "Accessories",
    description: "Durable backpack",
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 60,
    image:
      "https://img.freepik.com/premium-photo/sleek-modern-coffee-maker-brewing-rich-aro-00347-03_883586-67286.jpg",
    category: "Home Appliances",
    description: "Brew fresh coffee",
  },
  {
    id: 2,
    name: "Sunglasses",
    price: 25,
    image:
      "https://i5.walmartimages.com/seo/Xagger-Polarized-Wrap-Around-Sport-Sunglasses-for-Men-Women-UV400-Lightweight-Baseball-Softball-Running-Cycling-Sun-Glasses_b4d23baa-b2f6-4565-a9aa-77211260a988.d739033635c1eb3cedf22be1d3f5a19d.jpeg",
    category: "Accessories",
    description: "Stylish sunglasses",
  },
  {
    id: 8,
    name: "Bracelets",
    price: 50,
    image: "https://www.zavya.co/cdn/shop/files/BR-80379-R.jpg?v=1736753144",
    category: "Wear",
    description:
      "Elegant Masculinity Rhodium Plated 925 Sterling Silver Men's Bracelets – Zavya",
  },
  // you can add more to reach 12
];

// ---------- MAIN COMPONENT ----------
export default function ShopSection() {
  const visible = sampleProducts.slice(0, 12); // ✔ ONLY ARRAY, SHOW 12

  return (
    <div className="max-w-7xl mx-auto px-4 py-20" data-section="products">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2"
      >
        <ShieldCheck size={30} className="text-indigo-600" />
        Why Shop With Us
      </motion.h2>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20"
      >
        {[
          { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            desc: "100% safe checkout",
          },
          { icon: RotateCcw, title: "Easy Returns", desc: "30-day return" },
          {
            icon: Headphones,
            title: "24/7 Support",
            desc: "Always here to help",
          },
        ].map((b, i) => (
          <BenefitCard key={i} Icon={b.icon} title={b.title} desc={b.desc} />
        ))}
      </motion.div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl font-bold mb-8 flex items-center gap-2"
      >
        <ShoppingCart size={28} className="text-green-600" />
        All Products
      </motion.h2>

      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {visible.map((p, i) => (
          <ProductCard key={p.id || i} product={p} />
        ))}
      </motion.div>
    </div>
  );
}
