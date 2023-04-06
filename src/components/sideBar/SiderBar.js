import "./Sidebar.css";
import { Link } from 'react-router-dom'
import main_logo from "../images/main_logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive " : "border"}  id="sidebar">
      <div className="sidebar__title flex justify-center items-center">
        <div >
          <img src={main_logo} alt="logo" />
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>
      <div className="sidebar__menu ">
        <div className="sidebar__link active_menu_link flex">
          <i className="fa fa-home"></i>
          Dashboard
        </div>
        <h2 className=""><Link to="/orders">Fuel</Link></h2>
        <span className="flex flex-col px-3 sidebar__link">
          <span className="p-2">Essance</span>
          <span className="p-2">Diesel</span>

        </span>

        <h2 className=""><Link to="/orders">Airtime</Link></h2>
        <span className="flex flex-col px-3 sidebar__link">
          <span className="p-2">MTN</span>
          <span className="p-2">Airtel</span>

        </span>

        <h2 className=""><Link to="/orders">Startimes</Link></h2>
        <h2 className=""><Link to="/orders">Electricity</Link></h2>
        <h2>  settings</h2>

        <div className="sidebar__link">
          <span className="flextems-center  my-2"><i className="fa fa-briefcase mr-2"></i>
            Manager</span>
          <span className="flex flex-col">
            <span className="p-2">User</span>
            <span className="p-2">Roles</span>
            <span className="p-2">Services</span>
          </span>
        </div>

        <div className="sidebar__logout border flex justify-around items-center">
          <i className="fa fa-power-off"></i>
          <i className="fa fa-power-off"></i>
          <i className="fa fa-power-off"></i>
        
        </div>
      </div>
    </div>
  );
};

export default Sidebar;