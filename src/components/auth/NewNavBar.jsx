import React, { useEffect, useState } from 'react';
import jaliKoi_logo from "../images/jal_koi.png"
import home_banner from "../images/home-banner.png"
import { Link } from 'react-router-dom'


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

            <nav className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center">
                    <Link to="/">
                        <img
                            className="h-10 object-cover jal_koi-logo"
                            src={jaliKoi_logo}
                            alt=" jali koi Logo"
                        />
                    </Link>
                </div>

                <div className="items-center hidden space-x-8 lg:flex">

                    <Link to="/"> <a className="flex text-gray-600 cursor-pointer transition-colors duration-300">
                        Home
                    </a> </Link>
                    <a href="#info-content" className="flex text-gray-600 cursor-pointer transition-colors duration-300">
                        About us
                    </a>
                    <a href="#info-content" className="flex text-gray-600 cursor-pointer transition-colors duration-300">
                        Contact us
                    </a>

                    

                </div>

                <div className="flex items-center space-x-5">
                   

                    <Link to="/login"> <a className="flex p-2 rounded-md primary-background-color   text-white cursor-pointer transition-colors duration-300 font-semibold ">
                        <svg className="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                        </svg>
                        Login
                    </a> </Link>
                </div>
            </nav>
        </div>
    )
}

export default NewNavBar