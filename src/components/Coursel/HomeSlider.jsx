import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsynServices,
  getAllPaginatedServices,
  getAllpublicPaginatedServices,
  getAllpublicServices,
  getAllServices,
  getIsLoadingServices,
  getpublicIsLoadingServices,
  getUser,
} from "../../redux/transactions/TransactionSlice";

const ImageGallery = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;

  // Get services
  const servicesList = useSelector(getAllServices);
  const paginatedServicesList = useSelector(getAllPaginatedServices);
  const isLoadingServices = useSelector(getIsLoadingServices);

  console.log("pub Services List:", servicesList);
  console.log("Paginated Services List:", paginatedServicesList);
  console.log("Is Loading Services:", isLoadingServices);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchAsynServices({
          currentPage: 1,
          searchQuery: "",
          categoryId: "",
          groupId: "",
        })
      );
    }
  }, [token]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Images focused on women's mental wellness
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Women supporting each other in group therapy",
      title: "Safe Spaces for Healing",
      description:
        "Creating judgment-free environments where women can share, heal, and grow together",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Woman practicing mindfulness and self-care",
      title: "Mindful Self-Care",
      description:
        "Empowering women to prioritize their mental health through mindfulness and self-compassion",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Diverse women in supportive community",
      title: "Strength in Sisterhood",
      description:
        "Building connections that celebrate diversity and foster mutual support among women",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Woman finding inner peace and balance",
      title: "Journey to Inner Peace",
      description:
        "Guiding women toward emotional balance, resilience, and lasting mental wellness",
    },
  ];

  React.useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Slightly longer intervals for contemplation

    return () => clearInterval(interval);
  }, [isAutoplay, images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };
  const LoadingCard = () => (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 animate-pulse">
      <div className="bg-white bg-opacity-20 h-48 w-full"></div>
      <div className="p-6">
        <div className="bg-white bg-opacity-20 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-white bg-opacity-20 h-4 w-1/2 rounded mb-3"></div>
        <div className="bg-white bg-opacity-20 h-3 w-1/4 rounded"></div>
      </div>
    </div>
  );
  const ServiceCard = ({ service }) => (
    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {service.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {service.description }
      </p>

      { service&& service.title==='Skill Development'&& <Link
         to="/craft-skills-showcase"
        className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
      >
        Learn More →
      </Link>}

      { service&& service.title==='Workshops & Skills development'&& <Link
         to="/craft-skills-showcase"
        className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
      >
        Learn More →
      </Link>}
      { service&& service.title==='Support Groups' && <Link  
        to="/support-groups"
        className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
      >
        Learn More →
      </Link>}
      { service&& service.title==='Privacy & Safety' && <Link 
        to="/privacy-policy"
        className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
      >
        Learn More →
      </Link>}

      {/* support geroups */}
      { service&& service.title==='Support Groups' && (  
        <Link 
           to="/support-groups"
          className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
        > 

          Learn More →
        </Link>
      )}
      {/* blogs */}

      { service&& service.title==='Resources & Blog' && (
        <Link
          to="/resources-blog"
          className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
        >
          Learn More →
        </Link>
      )}



    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nurturing{" "}
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Women's Wellness
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every woman deserves to feel heard, supported, and empowered on her
            mental health journey. Together, we create spaces where healing and
            growth flourish.
          </p>
        </div>

        <div className="relative">
          {/* Main Image Display */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-1">
            <div className="relative bg-white rounded-xl overflow-hidden group">
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Image Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        {image.title}
                      </h3>
                      <p className="text-lg opacity-95 leading-relaxed text-white">
                        {image.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group-hover:opacity-100 opacity-0"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group-hover:opacity-100 opacity-0"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Autoplay Toggle */}
              <button
                onClick={toggleAutoplay}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group-hover:opacity-100 opacity-0"
                aria-label={isAutoplay ? "Pause slideshow" : "Start slideshow"}
              >
                {isAutoplay ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex space-x-2 mt-6 justify-center">
            {images.map((_, index) => (
              <div
                key={index}
                className="relative h-1 bg-gray-300 rounded-full overflow-hidden cursor-pointer transition-all duration-300"
                style={{ width: index === currentSlide ? "40px" : "20px" }}
                onClick={() => setCurrentSlide(index)}
              >
                <div
                  className={`h-full bg-gradient-to-r from-rose-400 to-purple-400 transition-all duration-300 ${
                    index === currentSlide ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8">
            <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentSlide
                      ? "ring-4 ring-pink-400 scale-110 shadow-lg"
                      : "hover:scale-105 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`${image.title} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-rose-400/20 to-purple-400/20 transition-opacity duration-300 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {isLoadingServices
              ? // Loading state
                Array.from({ length: 8 }).map((_, index) => (
                  <LoadingCard key={index} />
                ))
              : // Product cards
              servicesList&&servicesList.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}

            {/* <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.64 7 14.31 7.14 14.05 7.36L12 9.41L9.95 7.36C9.69 7.14 9.36 7 9 7H3V9L9 9L12 12L15 9H21ZM12 13.5C11.2 13.5 10.5 14.2 10.5 15S11.2 16.5 12 16.5 13.5 15.8 13.5 15 12.8 13.5 12 13.5Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Support Groups
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Join safe spaces where women share experiences and find
                community healing together.
              </p>
              <Link
                to="/support-groups"
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div> */}

            {/* <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Workshops & Skill Development
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Attend empowering workshops on mindfulness, self-care, and
                mental wellness strategies.
              </p>

            

              <Link
                to="/craft-skills-showcase"
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
              >
                Learn More →
              </Link>
            </div> */}

            {/* <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.4 14.8 17.4H9.2C8.6 17.4 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.5H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Privacy & Safety
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Your confidentiality is protected with our secure, judgment-free
                environment.
              </p>
              <Link
                to="/privacy-policy"
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
              >
                Learn More →
              </Link>
            </div> */}

            {/* <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Resources & Blog
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Access our comprehensive library of mental health resources,
                articles, and wellness guides.
              </p>
              <Link
                to="/resources-blog"
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
              >
                Learn More →
              </Link>
            </div> */}
          </div>

          {/* Call to Action */}
          {/* <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Begin Your Wellness Journey?
              </h3>
              <p className="text-lg mb-6 opacity-95">
                You don't have to face your challenges alone. Join our
                supportive community today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-300 shadow-lg">
                  Find Support Now
                </button>
                
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
