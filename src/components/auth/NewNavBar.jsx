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
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/transactions/TransactionSlice";

const NewNavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  console.log("User  from Redux:", user);

  const [percent, setPercent] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to manage hover

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
    //   clear local storage or any other logout logic
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
  ];

  return (
    <div>
      <div
        className="fixed inset-x-0 top-0 z-50 h-1 bg-gradient-to-r from-purple-400 via-purple-400 to-blue-400 transition-all duration-300 shadow-lg"
        style={{ width: `${percent}%` }}
      ></div>

      <nav
        className={`bg-white/95 backdrop-blur-lg shadow-lg w-full fixed top-0 left-0 right-0 z-40 border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? "shadow-xl" : ""
        }`}
      >
        <div className="hidden lg:flex">
          <div className="flex items-center flex-1">
            <div className="flex justify-between items-center bg-gradient-to-r from-pink-400 to-pink-400 w-full text-white py-4 px-8 shadow-md">
              <a
                href="/"
                className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="h-16 w-16 bg-white/20 rounded-lg flex items-center justify-center drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <span className="text-2xl font-bold">IYM</span>
                  </div>
                  <div className="absolute -inset-2 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-left">
                  <span className="text-lg font-bold block leading-tight tracking-wide">
                    Inshuti Y'Umuryango
                  </span>
                  <span className="text-sm opacity-90 font-light italic">
                    We Provide, We Care, We Deliver
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="font-semibold text-white hover:text-yellow-200 transition-all duration-300 relative group px-3 py-2 rounded-md hover:bg-white/10"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-yellow-200 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-1/3">
            <div className="bg-gradient-to-r from-purple-500 to-purple-500 text-white px-6 w-full flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm group">
                  <Phone
                    size={14}
                    className="text-green-400 group-hover:text-green-300 transition-colors"
                  />
                  <span className="group-hover:text-green-100 transition-colors">
                    +250 787 435 731
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm group">
                  <Mail
                    size={14}
                    className="text-blue-400 group-hover:text-blue-300 transition-colors"
                  />
                  <span className="group-hover:text-blue-100 transition-colors">
                    help@highroup.rw
                  </span>
                </div>
              </div>

              <div className="flex space-x-2  w-full justify-end items-center">
                {isLoggedIn ? (
                  <div
                    className="relative flex items-center cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="flex ">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="text_sm font-bold">
                          {user.user?.fullName
                            ? user.user.fullName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      </div>
                    <div className="flex flex-col" >
                    <span className="ml-2 text_sm">{user.user?.username}</span>
                      <span className="text_sm font-bold">
                        {user.user?.fullName}
                      </span>
                    </div>

                    </div>
                    {isHovered && (
                      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                        >
                          <LogOut size={14} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <LogIn size={14} />
                      <span>Login</span>
                    </a>
                    <a
                      href="/sign-up"
                      className="flex items-center space-x-1 bg-blue-500 hover:to-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <User size={14} />
                      <span>Register</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-purple-400 via-purple-400 to-blue-400 text-white py-3 px-4">
            <a
              href="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-bold">HB</span>
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block leading-tight">
                  Inshuti Y'Umuryango
                </span>
                <span className="text-xs opacity-90 italic">
                  We Provide, We Care, We Deliver
                </span>
              </div>
            </a>

            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X
                    size={24}
                    className="transition-transform duration-300 rotate-180"
                  />
                ) : (
                  <Menu
                    size={24}
                    className="transition-transform duration-300"
                  />
                )}
              </div>
            </button>
          </div>

          {isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
                onClick={closeMobileMenu}
              ></div>

              <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-40 lg:hidden transform transition-all duration-300 animate-in slide-in-from-top-2">
                <div className="py-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.to}
                      href={link.to}
                      className="block px-6 py-4 text-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 font-medium transition-all duration-300 border-l-4 border-transparent hover:border-purple-400 hover:pl-8"
                      onClick={closeMobileMenu}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-400 via-purple-400 to-blue-400 text-white py-6 px-6">
                  <h3 className="font-bold mb-4 text-base">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm group">
                      <MapPin
                        size={16}
                        className="text-yellow-300 group-hover:text-yellow-200 transition-colors"
                      />
                      <span>IMA House, Kicukiro, Kigali</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm group">
                      <Phone
                        size={16}
                        className="text-green-300 group-hover:text-green-200 transition-colors"
                      />
                      <span>+250 787 438 701</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm group">
                      <Mail
                        size={16}
                        className="text-blue-300 group-hover:text-blue-200 transition-colors"
                      />
                      <span>highBytes@highroup.rbw</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    {isLoggedIn ? (
                      <div
                        className="relative flex items-center cursor-pointer border"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {user.user?.fullName}
                          </span>
                        </div>
                        <span className="ml-2">{user.user?.username}</span>
                        {isHovered && (
                          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                            >
                              <LogOut size={14} />
                              <span>Logout</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <a
                          href="/login"
                          className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex-1"
                          onClick={closeMobileMenu}
                        >
                          <LogIn size={16} />
                          <span>Login</span>
                        </a>
                        <a
                          href="/register"
                          className="flex items-center justify-center space-x-2 bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex-1"
                          onClick={closeMobileMenu}
                        >
                          <User size={16} />
                          <span>Register</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NewNavBar;
