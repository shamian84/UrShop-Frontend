import React from "react";
import HeroSection from "../components/Hero";
import Navbar from "../components/Navbar";
import ShopByCategory from "../components/ShopByCategory";
import TrendingNow from "../components/TrendingNow";
import ShopSection from "../components/shopSection";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <ShopByCategory />
      <TrendingNow />
      <ShopSection />
      <Footer />
    </div>
  );
};

export default Dashboard;
