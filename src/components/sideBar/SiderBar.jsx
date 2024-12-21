import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import high_byte_logo from "../images/high_byte_logo.png"
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
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  const apiUrljaliKoi = import.meta.env.VITE_API_URL_KOIPAY;

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.get(`${apiUrljaliKoi}/auth/signout`);
      localStorage.removeItem('user');
      window.location.replace('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  // Define your navigation items dynamically
  const menuItems = [
    { key: '/statistics', icon: <UserOutlined />, label: <Link to="/statistics">Dashboard</Link> },
    // { key: '/fuelEssance', icon: <VideoCameraOutlined />, label: <Link to="/fuelEssance">Essance</Link> },
    // { key: '/mtnTransactions', icon: <CloudOutlined />, label: <Link to="/mtnTransactions">MTN</Link> },
    // { key: '/startimes', icon: <ShopOutlined />, label: <Link to="/startimes">Startimes</Link> },
    // { key: '/electricity', icon: <BarChartOutlined />, label: <Link to="/electricity">Electricity</Link> },
    { key: '/high-bytes-product', icon: <BarChartOutlined />, label: <Link to="/high-bytes-product">Products</Link> },
    // { key: '/businesses', icon: <AppstoreOutlined />, label: <Link to="/businesses">Businesses</Link> },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: (
        <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Log Out
        </span>
      ),
    },
  ];
  return (
    <Sider style={siderStyle}>
      <div className='my-5 ' style={{ padding: '0px 16px', textAlign: 'center', color: 'white' }}>
        <Link to="/statistics">
          <div className=' rounded-md flex justify-center' >
            {/* <img
              className="h-10 object-cover jal_koi-logo"
              src={high_byte_logo}
              alt=" high bytes Logo"
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
