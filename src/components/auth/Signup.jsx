import React, { useState } from "react";
import {
  User,
  Phone,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import axios from "axios";
import koipay_logo from "../images/high_byte_logo.png";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import home_banner from "../images/home-banner.png";
import { useToasts } from "react-toast-notifications";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "Alain Honore",
    username: "alain",
    phone: "+250782179022",
    password: "Okelokelo1@",
    email: "",
    confirmPassword: "Okelokelo1@",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    //  payload
    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://ecommerce-backend-0v7j.onrender.com/api/auth/register",
        payload
      );

      if (response.status === 201) {
        setIsRegistered(true);
        setFormData({
          fullName: "",
          username: "",
          phone: "",
          password: "",
          email: "",
          confirmPassword: "",
        });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setErrors({
          general:
            error.response.data.message ||
            "Registration failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Registration Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  Welcome aboard, {formData.fullName}!
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Account Details:
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Full Name:</strong> {formData.fullName}
                    </p>
                    <p>
                      <strong>Username:</strong> {formData.username}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                    {formData.email && (
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  login to your account
                  <span className="sr-only">Login to your account</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NewNavBar />
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 mt-28 md:py-12">
        <div className="w-full max-w-2xl">
          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-8 text-center border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Join us today and get started</p>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
              <div className="space-y-6">
                {/* First Row - Full Name and Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.fullName
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        autoComplete="name"
                      />
                    </div>
                    {errors.fullName && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.username
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleInputChange}
                        autoComplete="username"
                      />
                    </div>
                    {errors.username && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.username}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Second Row - Phone and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.phone
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="+250782179022"
                        value={formData.phone}
                        onChange={handleInputChange}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.email
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Third Row - Password and Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.password
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-1 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.confirmPassword
                            ? "border-red-300 focus:ring-red-500"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-1 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center space-x-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
