import React, { useEffect, useState } from "react";
import MyCarousel from "./MuCarousel";
import Footer from "./Footer";
import NewNavBar from "./NewNavBar";
import TopBusiness from "./WorkshopsPrograms";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsynBusinessRegistered,
  getAllBussinessesRegistered,
} from "../../redux/transactions/TransactionSlice";
import FurnitureSection from "../Coursel/HomeSlider";
import FeatureSection from "../inshutiYumuryangoPages/AdvertSection";
import AboutUsSection from "../inshutiYumuryangoPages/AboutUsSection";
import ProductListing from "../services/ProductListing";
import Ourstory from "../images/ourstory.jpeg"

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRange, setSelectedRange] = useState();
  const dispatch = useDispatch();
  const allBussinessesRegisteredList = useSelector(getAllBussinessesRegistered);

  useEffect(() => {
    dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }));
  }, [dispatch, selectedRange, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <NewNavBar />
      <div className="flex flex-wrap w-full home-container container-main">
        <div className="bg-slate-200 animate-fadeIn">
          <div className="py-4">
            <FurnitureSection />
          </div>
        </div>

        <div className="flex justify-center items-center w-full advert-content pt-7 animate-fadeIn">
          <div className="slider-container">
            <MyCarousel />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full animate-fadeIn" id="product-listing" >
          <div className="p-4 mx-4 w-full flex flex-col justify-center items-center">
            <ProductListing />
          </div>
        </div>

        {allBussinessesRegisteredList && (
          <div className="flex flex-col justify-center items-center w-full my-3 animate-fadeIn" id="about-section">
            <div className="p-4 mx-4 w-full flex flex-col justify-center items-center">
              <AboutUsSection />
            </div>
          </div>
        )}
      </div>

      <div className="w-full pt-3" id="bottom-content">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
