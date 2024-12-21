import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageGallery = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="image-gallery">
            {/* Main Slider */}
            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                navigation
                autoplay={{
                    delay: 3000, // Delay between slides in milliseconds
                    disableOnInteraction: false, // Autoplay continues after user interaction
                }}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                loop
                className="main-slider"
            >
                <SwiperSlide>
                    <img
                        src="https://content3.jdmagicbox.com/comp/sidhart-nagar/x3/9999p5544.5544.200909110512.l6x3/catalogue/retina-building-design-naugarh-sidhart-nagar-architects-f9ut1how82.jpg"
                        alt="Main Slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://media.istockphoto.com/id/1377891569/photo/big-contemporary-villa-with-garden-and-swimming-pool.jpg?s=612x612&w=is&k=20&c=KgTAewLvJtZk09WWdRmI0zXEDfZrNOy2ZVXn3KzxNnE="
                        alt="Main Slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://media.istockphoto.com/id/468440364/photo/house-cube-deconstruction.jpg?s=612x612&w=is&k=20&c=8d0v9p5neZii1laBnQzTAyyqDRRl-c5rdht6TR_U6lw="
                        alt="Main Slide 3"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://content.jdmagicbox.com/comp/sidhart-nagar/x3/9999p5544.5544.200909110512.l6x3/catalogue/retina-building-design-naugarh-sidhart-nagar-architects-9rtq79qka3.jpg"
                        alt="Main Slide 4"
                    />
                </SwiperSlide>
            </Swiper>

            {/* Thumbnail Slider */}
            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                slidesPerView={4}
                spaceBetween={10}
                loop
                className="thumbnail-slider"
            >
                <SwiperSlide>
                    <img
                        src="https://content.jdmagicbox.com/comp/sidhart-nagar/x3/9999p5544.5544.200909110512.l6x3/catalogue/retina-building-design-naugarh-sidhart-nagar-architects-9rtq79qka3.jpg"
                        alt="Thumbnail 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://media.istockphoto.com/id/468440364/photo/house-cube-deconstruction.jpg?s=612x612&w=is&k=20&c=8d0v9p5neZii1laBnQzTAyyqDRRl-c5rdht6TR_U6lw="
                        alt="Thumbnail 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://media.istockphoto.com/id/1377891569/photo/big-contemporary-villa-with-garden-and-swimming-pool.jpg?s=612x612&w=is&k=20&c=KgTAewLvJtZk09WWdRmI0zXEDfZrNOy2ZVXn3KzxNnE="
                        alt="Thumbnail 3"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://content3.jdmagicbox.com/comp/sidhart-nagar/x3/9999p5544.5544.200909110512.l6x3/catalogue/retina-building-design-naugarh-sidhart-nagar-architects-f9ut1how82.jpg"
                        alt="Thumbnail 4"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ImageGallery;
