import { useSelector } from "react-redux";
import { getUser } from "../../redux/transactions/TransactionSlice";
import "./Navbar.css";
// import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const user = useSelector(getUser);
  return (
    <nav className="navbar ">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left ">
      </div>

      <div className="navbar__right  p-5">

        {user && (<span className="px-3">Welcome, <span className="text-fuchsia-500  ">{user.name}</span> </span>)}


        <div class="relative">
          <span className="avatar  flex justify-center items-center p-2 bg-slate-400 text-slate-400">
          <svg class="absolute w-12 h-8 text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </span>
          <span class="top-0 left-7 absolute  w-3.5 h-3.5 bg-fuchsia-500 border-2 border-white  rounded-full"></span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;