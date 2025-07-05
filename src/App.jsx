import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/auth/Home";
import Reset from "./components/auth/Reset";
import DashboardLayout from "./components/dashboard/DashboardLayout";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import { useDispatch, useSelector } from "react-redux";
import { loggedInStatus } from "./redux/transactions/TransactionSlice";
import Dashboard from "./components/dashboard/pages/Dashboard";
import ManageProduct from "./components/dashboard/pages/ManageProduct";
import ServiceManagementDashboard from "./components/dashboard/pages/ServiceManagementDashboard";
import UserManagementDashboard from "./components/dashboard/pages/UserManagementDashboard";
import SupportGroupsPage from "./components/services/SupportGroups";
import CraftSkillsShowcase from "./components/services/CraftSkillsShowcase";
import CraftSkillsTraining from "./components/services/SkillTrainingServices";
import PrivacyPolicyPage from "./components/services/PrivacyPolicyPage";
import ResourcesBlogScreen from "./components/services/ResourcesBlogPage";
import ManageBlogs from "./components/dashboard/pages/ManageBlogs";
import ManageGroups from "./components/dashboard/pages/ManageGroups";
import Myprofile from "./components/auth/Myprofile";

function App() {
  const loginStatus = useSelector(loggedInStatus);
  console.log("Login Status:", loginStatus);

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
                element={
                  loginStatus ? <DashboardLayout /> : <Navigate to="/" />
                }
              />
              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={loginStatus ?< ServiceManagementDashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/manage-product"
                element={loginStatus ? <ManageProduct /> : <Navigate to="/" />}
              />
              {/*  UserManagementDashboard */}
              <Route
                path="/users-management"
                element={
                  loginStatus ? (
                    <UserManagementDashboard />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* SupportGroupsPage */}
              <Route
                path="/support-groups"
                element={ <SupportGroupsPage />
                }
              />
              {/* CraftSkillsShowcase */}
              <Route
                path="/craft-skills-showcase"
                element={ <CraftSkillsShowcase/>
                }
              />
              {/* CraftSkillsShowcase */}
              <Route
                path="/craft-skills-training/*"
                element={ <CraftSkillsTraining  />
                }
              />
              {/* PrivacyPolicyPage */}
              <Route
                path="/privacy-policy"
                element={ <PrivacyPolicyPage  />
                }
              />
              {/* ResourcesBlogScreen */}
              <Route
                path="/resources-blog"
                element={ <ResourcesBlogScreen  />
                }
              />
               {/* ManageBlogs */}
            <Route
              path="/manage-blogs"
              element={
                loginStatus ? <ManageBlogs /> : <Navigate to="/" />
              }
            /> {/* ManageGroup*/}


           
            <Route
              path="/manage-groups"
              element={
                loginStatus ? <ManageGroups /> : <Navigate to="/" />
              }
            />
              {/* Myprofile */}
             <Route
              path="/manage-profile"
              element={
                loginStatus ? <Myprofile /> : <Navigate to="/" />
              }
            />
            </Routes>
         

          </div>
        </Router>
      </div>
    </ToastProvider>
  );
}

export default App;
