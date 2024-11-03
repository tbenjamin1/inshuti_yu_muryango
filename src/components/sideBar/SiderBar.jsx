import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import main_logo from "../images/main_logo.png";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('https://api.koipay.co/api/v1/auth/signout');
      // Assuming the server responds with a token upon successful authentication
      window.location.replace('/');
      localStorage.removeItem('user');
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  useEffect(() => {
    // Get the current path from the location object
    const currentPath = location.pathname;
    // Update the active tab based on the current path
    setActiveTab(currentPath);
  }, [location]);

  return (
    <div className={sidebarOpen ? "sidebar_responsive " : "border"} id="sidebar">
      <div className="sidebar__title flex justify-center items-center">
        <div >
          <Link to="/statistics" ><img src={main_logo} alt="logo" /></Link>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      <div className="sidebar__menu ">
        <div  className={activeTab === '/statistics' ? 'activeTab sidebar__link active_menu_link flex' : 'sidebar__link active_menu_link flex'}>
          <Link to="/statistics" ><i className="fa fa-home"></i>
            Dashboard</Link>
        </div>
        <h2 className="">Fuel</h2>
        <span className="flex flex-col px-3 sidebar__link">
          <span className="p-2"><Link to="/fuelEssance">Essance</Link></span>
          <span className="p-2">Diesel</span>
        </span>
        <h2 className="">Airtime</h2>
        <span className="flex flex-col px-3 sidebar__link">
          <span className={activeTab === '/mtnTransactions' ? ' activeTab p-2':'p-2' }> <Link to="/mtnTransactions">MTN</Link></span>
          <span className={activeTab === '/airtelTransaction' ? ' activeTab p-2':'p-2' }> <Link to="/airtelTransaction">Airtel</Link></span>
        </span>
        <h2 className={activeTab === '/startimes' ? ' activeTab p-2':'p-2' }><Link to="/startimes">Startimes</Link></h2>
        <h2 className={activeTab === '/electricity' ? ' activeTab px-2 py-4':'px-2' }><Link to="/electricity">Electricity</Link></h2>
        <h2 className={activeTab === '/businesses' ? ' activeTab px-2 py-4':'px-2' }><Link to="/businesses">Businesses</Link></h2>
        
        <h2>settings</h2>
        <div className="sidebar__link">
          <span className="flextems-center  my-2"><i className="fa fa-briefcase mr-2"></i>
            Manager</span>
          <span className="flex flex-col">
            <span className="p-2">User</span>
            <span className="p-2">Roles</span>
            <span className="p-2">Services</span>
          </span>
        </div>
        <div className="sidebar__logout border  rounded-xl flex justify-around items-center" onSubmit={handleLogout}  >
          <i className="fa fa-power-off"></i>
          <span className='cursor-pointer hover:bg-gray-400 p-2 rounded-xl ' onClick={handleLogout} >Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;