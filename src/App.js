
import './App.css';
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Reset from "./components/auth/Reset"
import DashboardHome from "./components/dashboard/DashboardHome"
import Orders from "./components/dashboard/pages/Orders"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <div className=" justify-center  ">
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/reset" element={<Reset/>}/>
          
          <Route exact path="/sign-up" element={<Signup/>}/>
          <Route exact path="/dashboard-home/*" element={<DashboardHome/>}/>
          <Route exact path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </Router>
    </div>
    
  
  );
}

export default App;
