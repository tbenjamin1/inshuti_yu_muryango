
import './App.css';
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import BusinessReport from "./components/dashboard/pages/BusinessReport";
import Reset from "./components/auth/Reset";
import DashboardLayout from "./components/dashboard/DashboardLayout"
import Statistics from "./components/dashboard/pages/Statistics"
import FuelEssance from "./components/dashboard/pages/FuelEssance"
import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import Electricity from './components/dashboard/pages/Electricity';
import MtnTransactions from './components/dashboard/pages/MtnTransactions';
import AirtelTransaction from './components/dashboard/pages/AirtelTransaction';
import Startimes from './components/dashboard/pages/Startimes';
import RefereePage from './components/dashboard/pages/RefereePage';
import ParkPick from './components/dashboard/parkpick/pages/ParkPick';
import RegisterEntity from './components/dashboard/pages/RegisterEntity';
import RegisterBusiness from './components/dashboard/pages/RegisterBusiness'
import { useDispatch, useSelector } from "react-redux"
import { loggedInStatus } from './redux/transactions/TransactionSlice';
import Businesses from './components/dashboard/pages/Businesses';
import TermsConditions from './components/dashboard/pages/TermsConditions';

function App() {
  
  const loginStatus = useSelector(loggedInStatus);

  
  return (
    <ToastProvider>
    <div>
      <Router>
      <div className="justify-center">

        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route  path="/reset" element={<Reset/>}/>
          <Route  path="/sign-up" element={<Signup/>}/>

           <Route exact path="/register-business" element={<RegisterBusiness />}/>
               <Route  path="/register-entity" element={<RegisterEntity/>}/>
             <Route  path="/referee-page" element={<RefereePage/>}/>
              <Route  path="/terms-conditions" element={<TermsConditions/>}/>

              <Route
                path="/dashboard-home/*"
                element={loginStatus ? <DashboardLayout /> : <Navigate to="/" />}
              />
              <Route
                path="/statistics"
                element={loginStatus ? <Statistics /> : <Navigate to="/" />}
              />
              <Route
                path="/fuelEssance"
                element={loginStatus ? <FuelEssance /> : <Navigate to="/" />}
              />
              <Route
                path="/electricity"
                element={loginStatus ? <Electricity /> : <Navigate to="/" />}
              />
              <Route
                path="/mtnTransactions"
                element={loginStatus ? <MtnTransactions /> : <Navigate to="/" />}
              />
              <Route
                path="/airtelTransaction"
                element={loginStatus ? <AirtelTransaction /> : <Navigate to="/" />}
              />
              <Route
                path="/startimes"
                element={loginStatus ? <Startimes /> : <Navigate to="/" />}
              />

              <Route
                path="/park-pick"
                element={loginStatus ? <ParkPick /> : <Navigate to="/" />}
              />
              <Route
                path="/businesses"
                element={loginStatus ? <Businesses/> : <Navigate to="/" />}
              />


               <Route
                path="/business-report"
                element={loginStatus ? <BusinessReport/> : <Navigate to="/" />}
              />
              

        </Routes>


      </div>
    </Router>
    </div>
    </ToastProvider>
    
  
  );
}

export default App;

// const App = () => {
//   return <h1>Hello, World!</h1>
// };

// export default App;
