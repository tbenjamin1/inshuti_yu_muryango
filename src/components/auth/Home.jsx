import React, { useEffect, useState } from 'react';
import high_byte_logo from "../images/high_byte_logo.png"

import MyCarousel from './MuCarousel';

import Footer from './Footer';
import NewNavBar from './NewNavBar';
import { Link } from 'react-router-dom'
import TopBusiness from './TopBusiness'; import { useDispatch, useSelector } from "react-redux";
import {  fetchAsynBusinessRegistered, getAllBussinessesRegistered } from '../../redux/transactions/TransactionSlice';
import FurnitureSection from '../Coursel/HomeSlider';
import FeatureSection from '../hibitesPages/AdvertSection';
import AboutUsSection from '../hibitesPages/AboutUsSection';
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
            <NewNavBar />
            <div className="flex flex-wrap  w-full home-container container-main " >
                <div
                    className=" bg-slate-200"
                >
                 <div className='py-4'>
                        <FurnitureSection />
                 </div>
                </div>

                <div className='flex flex-col justify-center items-center w-full'  >
                    <div className='p-4  w-full'>
                        <FeatureSection />
                    </div>
                </div>

                <div className='flex justify-center items-center w-full advert-content pt-7'  >
                    <div className='slider-container ' >
                        <MyCarousel />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-full'  >
                    <div className='p-4 mx-4 w-full flex flex-col justify-center items-center  '>
                        <TopBusiness allBussinessesRegisteredList={allBussinessesRegisteredList} />
                    </div>
                </div>
               
                {allBussinessesRegisteredList && <div className='flex flex-col justify-center items-center w-full my-3'  >
                    <div className='p-4 mx-4 w-full flex flex-col justify-center items-center '>
                        <AboutUsSection />
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
