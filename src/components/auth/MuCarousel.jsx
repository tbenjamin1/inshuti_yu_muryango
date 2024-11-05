import React from 'react';
import { Carousel } from 'antd';
import home_banner from "../images/home-banner.png"
const contentStyle = {
    margin: 0,
    height: '200px',
    color: '#fff',
    borderRadius: '10px', 
    lineHeight: '160px',
    textAlign: 'center',
    backgroundImage: `url(${home_banner})`,  // Set your image path here
    backgroundSize: 'cover',    // Ensures the image covers the entire div
    backgroundPosition: 'center',  // Centers the image within the div
    backgroundRepeat: 'no-repeat'
};
const App = () => (
    <>
        <Carousel arrows infinite={true} autoplay  autoplaySpeed={3000} >
            <div>
                <h3 className='slider-title' style={contentStyle}> Register with JaliKoi today and take your business to the next level. It is 100% free!</h3>
            </div>
            <div>
                <h3 className='slider-title'  style={contentStyle} >Ready to transform your customer relationships and drive sales?</h3>
            </div>
            <div>
                <h3 className='slider-title'  style={contentStyle}>Ready to grow your community of supporters? Register on JaliKoi today and let’s drive meaningful change together!</h3>
            </div>
            
        </Carousel>
        
    </>
);
export default App;