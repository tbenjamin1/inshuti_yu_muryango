import React, { useState } from 'react';
import { Button, Drawer, Avatar, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);

    // Dummy user data
    const userInfo = {
        name: 'Rugamba Benjamin',
        username: '@ruisbenja',
        avatar: 'https://via.placeholder.com/64', // Example avatar URL
    };

    const userRole = ['administrator']; // Example user roles

    const hasAdminAccess = userRole.includes('administrator');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Profile Button */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={showDrawer}>
                <button

                    className="text-gray-700 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Drawer */}
            <Drawer
                title="Sub Menu"
                placement="top"
                width={320}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Close</Button>
                    </Space>
                }
            >


              
                {/* Navigation Links */}
                <div className="flex bg-[#7a2949] w-full  justify-between items-center space-x-6  px-2 py-2 rounded-md">
                    <Link
                        to="/"
                        className="font-medium text-white hover:text-gray-300 transition-colors flex   items-center"
                    >
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="font-medium text-white hover:text-gray-300 transition-colors"
                    >
                        Products
                    </Link>
                    <Link
                        to="/about"
                        className="font-medium text-white hover:text-gray-300 transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className="font-medium text-white hover:text-gray-300 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>

                <div className="bg-[#102c4a]  text-white py-4 px-6 text-right w-full my-3 rounded-md">
                    <p className="text-sm text-white">121 King Street, Melbourne 3000</p>
                    <p className="text-sm text-white">+12 3 0000 0000</p>
                    <p className="text-sm text-white">contact@brandemail.com</p>
                </div>
            </Drawer>
        </>
    );
};

export default ProfileDropdown;
