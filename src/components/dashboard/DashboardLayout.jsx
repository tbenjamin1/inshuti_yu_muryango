import { useEffect, useState } from "react";


import Sidebar from "../sideBar/SiderBar";
import moment from 'moment';
import NewNavBar from "../auth/NewNavBar";

function DashboardHome(props) {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  

  return (
    <div className="flex justify-between  bg-slate-100 ">
      <div className="filter_top">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
     </div>
      <div className="flex flex-col items-center bg-slate-100 filter-top">
        <NewNavBar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
        <div className="page-content w-full justify-center items-center p-4 bg-slate-100 h-full ">{props.children}</div>
      </div>
    </div>
  );
}

export default DashboardHome

