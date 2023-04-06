import { useState } from "react";
import Filter from "../filter";
import Navbar from "../navBar/Navbar";
import Sidebar from "../sideBar/SiderBar";

function DashboardHome(props) {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex   flex-col w-full items-center bg-slate-100"  >
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}  />
        <div className=" filter-container my-5 p-8"><Filter/></div>
        <div className="page-content w-full justify-center items-center p-4 bg-slate-100 h-full ">{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardHome

