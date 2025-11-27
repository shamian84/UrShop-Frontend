/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts, searchProducts } from "../api/products.js";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update filtered products when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      // Use local search instead of API call to prevent multiple requests
      const searchTerm = searchQuery.toLowerCase();
      const localResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm))
      );
      setFilteredProducts(localResults);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();

      // If no products from database, use fallback data
      if (data.length === 0) {
        setProducts(getFallbackProducts());
        setFilteredProducts(getFallbackProducts());
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
      // Use fallback data on error
      setProducts(getFallbackProducts());
      setFilteredProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const results = await searchProducts(query);
      setFilteredProducts(results);
    } catch (error) {
      console.error("Error searching products:", error);
      // Fallback to local search
      const searchTerm = query.toLowerCase();
      const localResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description &&
            product.description.toLowerCase().includes(searchTerm))
      );
      setFilteredProducts(localResults);
    } finally {
      setLoading(false);
    }
  };

  // Fallback products when database is empty
  const getFallbackProducts = () => [
    {
      _id: 1,
      name: "Wireless Earbuds",
      price: 59,
      description: "High-quality wireless earbuds with noise cancellation",
      image: "https://images.unsplash.com/photo-1606813907291-f32a18d1a3a7",
    },
    {
      _id: 2,
      name: "Smart Watch",
      price: 120,
      description: "Advanced smartwatch with health monitoring features",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    },
    {
      _id: 3,
      name: "Running Shoes",
      price: 99,
      description: "Comfortable running shoes with superior cushioning",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      _id: 4,
      name: "Coffee Beans",
      price: 20,
      description: "Premium coffee beans from organic farms",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      _id: 5,
      name: "Leather Wallet",
      price: 45,
      description: "Genuine leather wallet with RFID protection",
      image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
    },
    {
      _id: 6,
      name: "Phone Case",
      price: 25,
      description: "Protective phone case with shock absorption",
      image: "https://images.unsplash.com/photo-1606813907291-f32a18d1a3a7",
    },
    {
      _id: 7,
      name: "Sunglasses",
      price: 49,
      description: "UV protection sunglasses with polarized lenses",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      _id: 8,
      name: "Table Lamp",
      price: 65,
      description: "Modern LED table lamp with adjustable brightness",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    },
    {
      _id: 9,
      name: "Bluetooth Speaker",
      price: 79,
      description: "Portable Bluetooth speaker with excellent sound quality",
      image: "https://images.unsplash.com/photo-1616627457226-b3e4e8dbe8cb",
    },
    {
      _id: 10,
      name: "Backpack",
      price: 89,
      description: "Durable backpack with multiple compartments",
      image: "https://images.unsplash.com/photo-1596464716121-3b5b5f2c6b9e",
    },
    {
      _id: 11,
      name: "Smartphone",
      price: 499,
      description: "Latest smartphone with advanced camera features",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      _id: 12,
      name: "Camera Lens",
      price: 299,
      description: "Professional camera lens for photography enthusiasts",
      image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e",
    },
    {
      _id: 13,
      name: "Wireless Mouse",
      price: 35,
      description: "Ergonomic wireless mouse with precision tracking",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
    },
    {
      _id: 14,
      name: "Keyboard",
      price: 60,
      description: "Mechanical keyboard with RGB backlighting",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
      _id: 15,
      name: "Gaming Chair",
      price: 199,
      description: "Comfortable gaming chair with lumbar support",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    },
    {
      _id: 16,
      name: "Monitor",
      price: 250,
      description: "High-resolution monitor with fast refresh rate",
      image: "https://images.unsplash.com/photo-1587202372775-98927b45b22e",
    },
  ];

  const value = {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleSearch,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
