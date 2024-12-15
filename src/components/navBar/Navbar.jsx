import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getUser } from "../../redux/transactions/TransactionSlice";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import jaliKoi_logo from "../images/jal_koi.png"

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const user = useSelector(getUser);
  const [percent, setPercent] = useState(0);

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setPercent(Math.round((winScroll / height) * 100));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500" style={{ width: `${percent}%` }}></div>
      <nav className="flex justify-between px-4 py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-10 object-cover jal_koi-logo"
              src={jaliKoi_logo}
              alt=" jali koi Logo"
            />
          </Link>
        </div>

        <div className="items-center hidden space-x-8 lg:flex">

          <Link to="/"> <a className="flex text-gray-600 cursor-pointer transition-colors duration-300">
            Home
          </a> </Link>
          <a href="/" className="flex text-gray-600 cursor-pointer transition-colors duration-300">
            About us
          </a>
          <a href="/" className="flex text-gray-600 cursor-pointer transition-colors duration-300">
            Contact us
          </a>

        </div>

        <div className="flex items-center space-x-5">
          {user && (<span className="px-3">Welcome, <span className="text-fuchsia-500  ">{user.name}</span> </span>)}
            <div class="relative">
              <span className="avatar  flex justify-center items-center p-2 bg-slate-400 text-slate-400">
              <svg class="absolute w-12 h-8 text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </span>
              <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-fuchsia-500 border-2 border-white  rounded-full"></span>
            </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;