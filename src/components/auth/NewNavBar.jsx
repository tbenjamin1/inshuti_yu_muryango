import React, { useEffect, useState } from 'react';
import high_byte_logo from "../images/high_byte_logo.png"
import home_banner from "../images/home-banner.png"
import { Link } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown';


const NewNavBar = () => {

    const [percent, setPercent] = useState(0);

    const handleScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setPercent(Math.round((winScroll / height) * 100));
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className="fixed inset-x-0 top-0 z-50 h-0.5 mt-0.5 bg-blue-500" style={{ width: `${percent}%` }}></div>

            <nav className="flex justify-between  bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center main-nav-container  w-2/3">
                    <div className="flex    justify-between items-center bg-[#7a2949] w-full text-white py-4 px-8 ">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                src={high_byte_logo}
                                alt="High Bytes Logo"
                                className="h-16 object-contain"
                            />
                            <span className="text-sm font-medium">
                                High Bytes
                                <br />
                                <span className="text-xs">We Provide, We Care, We Deliver</span>
                            </span>
                        </Link>

                        {/* Mobile Burger Menu Button */}
                        <div className="md:hidden">
                           
                            <ProfileDropdown/>
                        </div>


                        {/* Navigation Links */}
                        <div className="flex  justify-between menu-links items-center space-x-6 ml-10">
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
                    </div>

                </div>


                <div className="flex  space-x-5 w-1/3 menu-contact">
                    <div className="bg-[#102c4a]  text-white py-4 px-6 text-right w-full">
                        <p className="text-sm text-white">121 King Street, Melbourne 3000</p>
                        <p className="text-sm text-white">+12 3 0000 0000</p>
                        <p className="text-sm text-white">contact@brandemail.com</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NewNavBar