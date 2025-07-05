import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Bell,
  Search,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/transactions/TransactionSlice";



const ModernNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [percent, setPercent] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isLoggedIn = user && user.token ? true : false;

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setPercent(Math.round((winScroll / height) * 100));
    setIsScrolled(winScroll > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
    // { to: "/contact", label: "Contact" },
  ];

  const userMenuItems = [
    { label: "Profile", href: "/profile" },
    // { label: "Settings", href: "/settings" },
    // { label: "Orders", href: "/orders" },
    // { label: "Help", href: "/help" },
  ];

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div
        className="fixed inset-x-0 top-0 z-50 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-300 shadow-lg"
        style={{ width: `${percent}%` }}
      />

      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-white/95 backdrop-blur-lg shadow-md"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          {/* Top Contact Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-2 px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <Phone size={12} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  <span className="group-hover:text-emerald-100 transition-colors">+250 787 435 731</span>
                </div>
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <Mail size={12} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="group-hover:text-blue-100 transition-colors">help@highroup.rw</span>
                </div>
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <MapPin size={12} className="text-orange-400 group-hover:text-orange-300 transition-colors" />
                  <span className="group-hover:text-orange-100 transition-colors">Kigali, Rwanda</span>
                </div>
              </div>
              <div className="text-xs opacity-75">
                We Provide, We Care, We Deliver
              </div>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <span className="text-lg font-bold text-white">IYM</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                </div>
                <div className="text-left">
                  <span className="text-xl font-bold text-gray-900 block leading-tight">
                    Inshuti Y'Umuryango
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    Premium Services
                  </span>
                </div>
              </a>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="relative font-medium text-gray-700 hover:text-purple-600 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-purple-50 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </a>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                {/* <div className="relative">
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  >
                    <Search size={20} className="text-gray-600" />
                  </button>
                  {isSearchOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                  )}
                </div> */}

                {isLoggedIn ? (
                  <>
                    {/* Notifications */}
                    {/* <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                      <Bell size={20} className="text-gray-600" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                        3
                      </span>
                    </button> */}

                    {/* User Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                      >
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">
                            {user.user?.fullName ? user.user.fullName.charAt(0).toUpperCase() : "U"}
                          </span>
                        </div>
                        <div className="text-left hidden xl:block">
                          <div className="text-sm font-medium text-gray-900">
                            {user.user?.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.user?.username}
                          </div>
                        </div>
                        <ChevronDown size={16} className="text-gray-500 group-hover:text-gray-700 transition-colors" />
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="font-medium text-gray-900">{user.user?.fullName}</div>
                            <div className="text-sm text-gray-500">{user.user?.email}</div>
                          </div>
                          {userMenuItems.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                          <div className="border-t border-gray-100 mt-1">
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut size={16} />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-3">
                    <a
                      href="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </a>
                    <a
                      href="/sign-up"
                      className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <User size={16} />
                      <span>Get Started</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center px-4 py-4">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-white">IYM</span>
              </div>
              <div className="text-left">
                <span className="text-base font-bold text-gray-900 block leading-tight">
                  Inshuti Y'Umuryango
                </span>
                <span className="text-xs text-gray-600">Premium Services</span>
              </div>
            </a>

            <div className="flex items-center space-x-2">
              {/* {isLoggedIn && (
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  <Bell size={18} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
              )} */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                onClick={closeMobileMenu}
              />
              <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-40 lg:hidden max-h-screen overflow-y-auto">
                {/* Search Bar */}
                {/* <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div> */}

                {/* Navigation Links */}
                <div className="py-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.to}
                      href={link.to}
                      className="block px-6 py-4 text-gray-800 hover:bg-purple-50 hover:text-purple-600 font-medium transition-all duration-300 border-l-4 border-transparent hover:border-purple-500"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* User Section */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-6">
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {user.user?.fullName ? user.user.fullName.charAt(0).toUpperCase() : "U"}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{user.user?.fullName}</div>
                          <div className="text-sm opacity-90">{user.user?.email}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {userMenuItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </a>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full py-2 px-4 rounded-lg bg-red-500/80 hover:bg-red-500 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">Get Started</h3>
                      <div className="space-y-3">
                        <a
                          href="/login"
                          className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                          onClick={closeMobileMenu}
                        >
                          <LogIn size={18} />
                          <span>Sign In</span>
                        </a>
                        <a
                          href="/sign-up"
                          className="flex items-center justify-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                          onClick={closeMobileMenu}
                        >
                          <User size={18} />
                          <span>Create Account</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="font-medium mb-3">Contact Us</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-3">
                        <Phone size={14} className="text-emerald-300" />
                        <span>+250 787 435 731</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail size={14} className="text-blue-300" />
                        <span>help@highroup.rw</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin size={14} className="text-orange-300" />
                        <span>Kigali, Rwanda</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Click outside handlers */}
      {(isUserMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ModernNavBar;