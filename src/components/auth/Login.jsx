import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  PhoneCall,
} from "lucide-react";
import koipay_logo from "../images/high_byte_logo.png";
import NewNavBar from "./NewNavBar";
import Footer from "./Footer";
import home_banner from "../images/home-banner.png";
import { useToasts } from "react-toast-notifications";

function Login() {
  const { addToast } = useToasts();
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailHandleChange = (event) => {
    setEmailValue(event.target.value);
    // Clear email error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const passwordHandleChange = (event) => {
    setPasswordValue(event.target.value);
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        identifier: email,
        password: password,
      };

      const response = await axios.post(
        `https://ecommerce-backend-0v7j.onrender.com/api/auth/login`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      addToast(`Welcome ${response.data.message}`, { appearance: "success" });

      const auth_user = response.data;
      console.log("User authenticated successfully:", auth_user);

      localStorage.setItem("user", JSON.stringify(auth_user));

      if (auth_user.user?.role === "user") {
        // Redirect for user user
        window.location.replace("/");
      } else if (auth_user.user?.role === "admin") {
        console.log("Admin user logged in");
        // Redirect for admin user
        window.location.replace("/dashboard");
      } else {
        window.location.replace("/");
      }

      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      addToast(errorMessage, { appearance: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NewNavBar />
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12 mt-28">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-8 text-center border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username/phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneCall className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="usernamephone"
                    type="text"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your Username/phone"
                    value={email}
                    onChange={emailHandleChange}
                    autoComplete="Username/phone"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

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
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={passwordHandleChange}
                    autoComplete="current-password"
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

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/reset"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <Link
                to="/support"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
