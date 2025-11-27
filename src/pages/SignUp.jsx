import React, { useState, useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // Check password strength
  const checkStrength = (pwd) => {
    if (pwd.length < 7) return "Too short";
    const hasUpper = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSymbol = /[!@#$%^&*]/.test(pwd);

    if (hasUpper && hasNumber && hasSymbol) return "Strong";
    if (
      (hasUpper && hasNumber) ||
      (hasUpper && hasSymbol) ||
      (hasNumber && hasSymbol)
    )
      return "Medium";
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setStrength(checkStrength(pwd));
  };

  // Field validation
  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Please enter your name";
    if (!email) newErrors.email = "Please enter your email";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    }

    if (!password) newErrors.password = "Please enter your password";
    else {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$/;
      if (!passwordRegex.test(password))
        newErrors.password =
          "Password must be 7+ chars with uppercase, number & symbol";
    }

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);

    try {
      const res = await api.post("/users/signup", { name, email, password });

      const userData = { ...res.data.user, token: res.data.token };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData); // Update global context

      toast.success(res.data.message, { position: "top-right" });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message || error.message || "Server error";
      toast.error(message, { position: "top-right" });

      if (status === 409) {
        // Redirect to login if user exists
        setTimeout(() => navigate("/login"), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10 space-y-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Join us and start your journey today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={`w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
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
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {strength && (
              <p
                className={`text-sm mt-1 ${
                  strength === "Strong"
                    ? "text-green-500"
                    : strength === "Medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                Strength: {strength}
              </p>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-4 text-gray-400" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              className="absolute right-3 top-4 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default SignUp;
