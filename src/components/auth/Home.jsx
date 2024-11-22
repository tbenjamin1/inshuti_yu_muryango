import React, { useEffect, useState } from 'react';
import koipay_logo from "../images/jal_koi.png"
import home_banner from "../images/home-banner.png"
import { Carousel } from 'antd';
import MyCarousel from './MuCarousel';
import Service from './Service';
import Footer from './Footer';
import NewNavBar from './NewNavBar';
import { Link } from 'react-router-dom'
import TopBusiness from './TopBusiness'; import { useDispatch, useSelector } from "react-redux";
import { fetchAsynBusinessCatgeory, fetchAsynBusinessRegistered, fetchAsyncTransaction, getAllBussinessesCategories, getAllBussinessesRegistered, getAllPaginatedBussinesses, getAllTransaction, getUser } from '../../redux/transactions/TransactionSlice';
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRange, setSelectedRange] = useState();
    const dispatch = useDispatch()
    const allBussinessesRegisteredList = useSelector(getAllBussinessesRegistered);
    useEffect(() => {
        dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }))
    }, [dispatch, selectedRange, currentPage]);

    return (
        <div className="flex flex-col  items-center justify-center mt-32 ">
            <NewNavBar/>
            <div className="flex flex-wrap  w-full home-container container-main " >
                <div
                    className="w-full home_banner relative h-64"
                    style={{
                        backgroundImage: `url(${home_banner})`
                    }}
                >
                    <div className='banner-content flex justify-items-end  h-full text-white ' >
                        <div className='flex flex-col  justify-center space-y-4 p-4 '  >
                            <div className='font-bold why-content-tile ' >Why Join JaliKoi</div>
                            <div className='why-content' >
                                <strong>Drive Sales Growth:</strong> Reward your customers for every purchase they make, encouraging higher spending and return visits <br />
                                <strong> Build Stronger Loyalty:</strong> Give your customers a reason to choose you every time with cashback that adds real value to their experience. <br />
                                <strong>Effortless Reward Management:</strong> Our user-friendly dashboard makes it easy to track and manage your cash back offerings and customer engagement.
                            </div>
                            <div className='font-bold why-content-tile w-1/2' >Register</div>
                            <div className='w-1/2 flex  justify-between'>
                                <Link to="/register-business" className='capitalize ' > <a className="flex py-2 home-btn rounded-md bg-white  primary-btn-color capitalize   font-semibold px-6 ">
                                     BUSINESS
                                </a> </Link>
                                <Link to="/register-entity" className='ml-3 ' > <a className="flex home-btn py-2 capitalize rounded-md bg-white  primary-btn-color   font-semibold  px-6">
                                     ENTITY
                                </a> </Link>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col justify-center items-center w-full'  >

                    <div className='p-4 w-full'>
                        <Service />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full advert-content pt-7'  >
                    <div className='slider-container ' >
                        <MyCarousel />
                    </div>
                </div>
                {allBussinessesRegisteredList && <div className='flex flex-col justify-center items-center w-full'  >
                    <div className='p-4 w-full'>
                        <TopBusiness allBussinessesRegisteredList={allBussinessesRegisteredList}   />
                    </div>
                </div>}
               
            </div>
            
            <div className='w-full pt-3' id='info-content' >
                <Footer />
              </div>
            
        </div>
    );
};

export default Home;
