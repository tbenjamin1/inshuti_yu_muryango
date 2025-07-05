import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import high_byte_logo from "../images/high_byte_logo.png";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

 

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

 
  // Define your navigation items dynamically
  const menuItems = [
    {
      key: "/dashboard",
      icon: <UserOutlined />,
      label: <Link to="/dashboard">Services</Link>,
    },
    {
      key: "/groups-management",
      icon: <AppstoreOutlined />,
      label: <Link to="/manage-groups">Groups</Link>,
    },
    // manage-blogs
    {
      key: "/manage-blogs",
      icon: <TeamOutlined />,
      label: <Link to="/manage-blogs">Blogs</Link>,
    },

    {
      key: "/manage-product",
      icon: <BarChartOutlined />,
      label: <Link to="/manage-product">Products</Link>,
    },
    {
      key: "/users-management",
      icon: <AppstoreOutlined />,
      label: <Link to="/users-management">user</Link>,
    },
   
  ];
  return (
    <Sider style={siderStyle}>
      <div
        className="my-5 "
        style={{ padding: "0px 16px", textAlign: "center", color: "white" }}
      >
        <Link to="/statistics">
          <div className=" rounded-md flex justify-center">
            {/* <img
              className="h-10 object-cover jal_koi-logo"
              src={high_byte_logo}
              alt="  Inshuti Y’Umuryango Logo"
            /> */}
          </div>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeTab]}
        items={menuItems}
      />
    </Sider>
  );
};

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout style={{ marginInlineStart: 100 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
      </Layout>
    </Layout>
  );
};

export default App;
