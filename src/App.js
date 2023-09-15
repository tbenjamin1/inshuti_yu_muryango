
import './App.css';
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Reset from "./components/auth/Reset"
import DashboardLayout from "./components/dashboard/DashboardLayout"
import Statistics from "./components/dashboard/pages/Statistics"
import FuelEssance from "./components/dashboard/pages/FuelEssance"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import Electricity from './components/dashboard/pages/Electricity';
import MtnTransactions from './components/dashboard/pages/MtnTransactions';
import AirtelTransaction from './components/dashboard/pages/AirtelTransaction';
import Startimes from './components/dashboard/pages/Startimes';
import RefereePage from './components/dashboard/pages/RefereePage';
import ParkPick from './components/dashboard/parkpick/pages/ParkPick';

function App() {
  return (
    <ToastProvider>
    <div>
      <Router>
      <div className=" justify-center  ">
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route  path="/reset" element={<Reset/>}/>
          <Route  path="/sign-up" element={<Signup/>}/>
          <Route  path="/dashboard-home/*" element={<DashboardLayout/>}/>
          <Route  path="/statistics" element={<Statistics/>}/>
          <Route  path="/fuelEssance" element={<FuelEssance/>}/>
          <Route  path="/electricity" element={<Electricity />}/>
          <Route  path="/mtnTransactions" element={<MtnTransactions />}/>
          <Route  path="/airtelTransaction" element={<AirtelTransaction />}/>
          <Route  path="/startimes" element={<Startimes />}/>
          <Route  path="/referee-page" element={<RefereePage />}/>
          <Route  path="/park-pick" element={<ParkPick />}/>
        </Routes>
      </div>
    </Router>
    </div>
    </ToastProvider>
    
  
  );
}

export default App;
