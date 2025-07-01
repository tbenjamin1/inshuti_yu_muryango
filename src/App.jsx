
import './App.css';
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Home from "./components/auth/Home"

import Reset from "./components/auth/Reset";
import DashboardLayout from "./components/dashboard/DashboardLayout"

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';

import { useDispatch, useSelector } from "react-redux"
import { loggedInStatus } from './redux/transactions/TransactionSlice';
import Dashboard from './components/dashboard/pages/Dashboard';



function App() {

  const loginStatus = useSelector(loggedInStatus);


  return (
    <ToastProvider>
      <div>
        <Router>
          <div className="justify-center">

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/sign-up" element={<Signup />} />


              <Route
                path="/dashboard-home/*"
                element={!loginStatus ? <DashboardLayout /> : <Navigate to="/" />}
              />
             {/* Dashboard */}
              <Route
                path="/dashboard"
                element={!loginStatus ? <Dashboard /> : <Navigate to="/" />}
              />

           
            </Routes>


          </div>
        </Router>
      </div>
    </ToastProvider>


  );
}

export default App;


