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

  // Helper function to generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Helper function to get route path based on service title/slug
  const getServiceRoute = (service) => {

    console.log("service",service)
    
    const slug = service._id;
    
    // Specific routes with slug as query parameter
    switch (service.title) {
      case 'Skill Development':
      case 'Workshops & Skills development':
        return `/craft-skills-showcase?slug=${slug}`;
      case 'Support Groups':
        return `/support-groups?slug=${slug}`;
      case 'Privacy & Safety':
        return `/privacy-policy?slug=${slug}`;
      case 'Resources & Blog':
        return `/resources-blog?slug=${slug}`;
      default:
        return `/services/${slug}`;
    }
  };

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
    }, 5000);

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
    <div className="bg-purple-200 bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 animate-pulse">
      <div className="bg-purple-200 bg-opacity-20 h-48 w-full"></div>
      <div className="p-6">
        <div className="bg-white bg-opacity-20 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-white bg-opacity-20 h-4 w-1/2 rounded mb-3"></div>
        <div className="bg-white bg-opacity-20 h-3 w-1/4 rounded"></div>
      </div>
    </div>
  );

  const ServiceCard = ({ service }) => {
    const serviceRoute = getServiceRoute(service);
    const slug = service.slug || generateSlug(service.title);

    return (
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
          {service.description}
        </p>

        {/* Method 1: Using dynamic route with slug */}
        <Link
          to={serviceRoute}
          className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
        >
          Learn More →
        </Link>

        {/* Method 2: Passing slug as state (alternative) */}
        {/* 
        <Link
          to={serviceRoute}
          state={{ slug: slug, service: service }}
          className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
        >
          Learn More →
        </Link>
        */}

        {/* Method 3: Using search params (alternative) */}
        {/* 
        <Link
          to={`${serviceRoute}?slug=${slug}&id=${service.id}`}
          className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
        >
          Learn More →
        </Link>
        */}
      </div>
    );
  };

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
                servicesList &&
                servicesList.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;