import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef();
  const { cartItems } = useCart();
  const { setSearchQuery: setGlobalSearchQuery } = useProducts();

  // --- Load user from localStorage ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);

    const handleUserChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  // --- Close profile dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Smooth debounce for search ---
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setGlobalSearchQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, setGlobalSearchQuery]);

  // --- Handlers ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChanged"));
    toast.success("Logged out!", { position: "top-right" });
    setTimeout(() => navigate("/"), 500);
  };

  const handleLoginClick = () => {
    toast("Redirecting to Login...", { position: "top-right" });
    setTimeout(() => navigate("/login"), 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery.trim());

    if (window.location.pathname === "/") {
      const productsSection = document.querySelector(
        '[data-section="products"]'
      );
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/"); // Redirect to home if not on it
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between py-4 md:py-5">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-lg cursor-pointer"
            onClick={() => navigate("/")}
          >
            U
          </div>
          <Link
            to="/"
            className="text-2xl font-bold text-black hover:text-gray-700"
          >
            UrShop
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center w-1/2 bg-gray-100 rounded-full px-4 py-2 border-2 border-black"
        >
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <div className="relative">
            <div
              onClick={() => navigate("/cart")}
              className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full border border-transparent hover:border-gray-800 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}
          </div>

          {/* Authentication / Profile */}
          {!user ? (
            <button
              onClick={handleLoginClick}
              className="hidden md:block px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold text-lg cursor-pointer hover:ring-2 hover:ring-gray-800 transition"
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-10">
                  <p className="font-semibold mb-2">{user.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 text-left hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none text-xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-6 pb-3 md:hidden space-y-3">
          {/* Mobile Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="flex items-center w-full bg-gray-100 rounded-full px-3 py-3 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700 mr-2" />
            <span className="font-medium">
              Cart ({cartItems.reduce((total, item) => total + item.qty, 0)})
            </span>
          </div>

          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full bg-gray-100 rounded-full px-3 py-3"
          >
            <Search className="text-gray-500 w-5 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-700"
            />
          </form>

          {/* Authentication / Profile */}
          {!user ? (
            <button
              onClick={handleLoginClick}
              className="w-full px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 rounded-full px-5 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
