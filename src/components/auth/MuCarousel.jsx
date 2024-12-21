import React from 'react';
import { Carousel } from 'antd';
import home_banner from "../images/home-banner.png";

const contentStyle = {
    margin: 0,
    color: '#fff',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundImage: `url(${home_banner})`, // Background image
    backgroundSize: 'cover', // Ensures the image covers the entire div
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat',
    height: '300px', // Adjust height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const App = () => (
    <div className="what-makes-us-different px-3 flex  ">
        
        <div className="content-section  p-4 ">
            <h2>What Makes Us Different?</h2>
            <p className="what_makes_us_different text-white py-3">
                At High Bytes, we redefine the standards of quality and service in household essentials.
                Specializing in premium window glass, veranda and staircase stainless steel, and a curated
                range of related products, our mission is to enhance the beauty and functionality of your
                living spaces.
            </p>

            {/* Feature List */}
            <div className="features mt-4  w-full">
                <div className="feature">
                    <h3>Experienced</h3>
                    <p className="what_makes_us_different text-white">
                        Our experience of 25 years of building and making achievements in the world of
                        development.
                    </p>
                </div>
                <div className="feature px-3">
                    <h3>Competitive Price</h3>
                    <p className="what_makes_us_different text-white">
                        The prices we offer you are very competitive without reducing the quality of the
                        company's work in the slightest.
                    </p>
                </div>
                <div className="feature">
                    <h3>On Time</h3>
                    <p className="what_makes_us_different text-white">
                        We prioritize the quality of our work and finish it on time.
                    </p>
                </div>
            </div>
        </div>
      
        <div className='carousel-section pt-2 pb-5' >
            <Carousel arrows infinite autoplay autoplaySpeed={3000}>
                <div>
                    <h3 className="slider-title" style={contentStyle}>
                        What Makes Us Different?
                    </h3>
                </div>
                <div>
                    <h3 className="slider-title" style={contentStyle}>
                        Experienced
                    </h3>
                </div>
                <div>
                    <h3 className="slider-title" style={contentStyle}>
                        Competitive Price
                    </h3>
                </div>
                <div>
                    <h3 className="slider-title" style={contentStyle}>
                        On Time
                    </h3>
                </div>
            </Carousel>
        </div>
    </div>
);

export default App;
