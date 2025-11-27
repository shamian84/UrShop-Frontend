import React, { useState, useContext, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig"; // preconfigured Axios instance
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // Handle input change
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Validate form fields
  const validateFields = useCallback(() => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Please enter your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const res = await api.post("/users/login", formData);

      const userData = { ...res.data.user, token: res.data.token };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success(res.data.message, { position: "top-right" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Server error";
      toast.error(message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10 space-y-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-2">
          Log In
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-10 pr-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default LoginPage;
