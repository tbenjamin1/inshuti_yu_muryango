import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const WhatMakesUsDifferent = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            title: "What Makes Us Different?",
            subtitle: "Empowering Women Through Community Support"
        },
        {
            title: "Compassionate Care",
            subtitle: "Understanding Every Woman's Journey"
        },
        {
            title: "Community-Centered",
            subtitle: "Building Supportive Networks"
        },
        {
            title: "Skill Development",
            subtitle: "Practical Training for Independence"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const features = [
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
            ),
            title: "Compassionate Care",
            description: "We understand that every woman's journey is unique. Our approach is rooted in empathy, providing judgment-free support that honors each woman's experience and challenges."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
            ),
            title: "Community-Centered",
            description: "We believe in the power of community connections. Our support groups create safe spaces where women can share experiences, build friendships, and find strength together."
        },
        {
            icon: (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
            ),
            title: "Skill Development",
            description: "Beyond emotional support, we provide practical training and skill-building opportunities that help women gain confidence, independence, and economic empowerment."
        }
    ];

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                {/* Content Section */}
                <div className="p-10 lg:p-12 flex flex-col justify-center text-white relative">
                    {/* Subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-black bg-opacity-10 rounded-l-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="mb-10">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                                What Makes Us Different?
                            </h2>
                            <p className="text-white text-opacity-90 text-xl leading-relaxed drop-shadow-sm">
                                At Inshuti Y'umubyeyi, we redefine support for disadvantaged pregnant women through 
                                comprehensive community empowerment and practical skill development.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-5 group">
                                    <div className="relative">
                                        <div className="flex-shrink-0 w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300 backdrop-blur-md border border-white border-opacity-20">
                                            {feature.icon}
                                        </div>
                                        <div className="absolute -inset-1 bg-white bg-opacity-10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-sm">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white text-opacity-90 text-lg leading-relaxed drop-shadow-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Carousel Section */}
                <div className="relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-20 animate-pulse"></div>
                        <div className="absolute inset-0">
                            <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="hexGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                                        <polygon points="7.5,1 13.5,5 13.5,11 7.5,15 1.5,11 1.5,5" fill="none" stroke="white" strokeWidth="0.5"/>
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#hexGrid)"/>
                            </svg>
                        </div>
                    </div>

                    {/* Slide Content */}
                    <div className="relative h-full flex items-center justify-center p-12">
                        <div className="text-center text-white max-w-md">
                            <div className="mb-8">
                                <div className="relative group">
                                    <div className="w-24 h-24 mx-auto bg-white bg-opacity-25 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white border-opacity-20">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div className="absolute -inset-2 bg-white bg-opacity-20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                
                                <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg transform transition-all duration-500">
                                    {slides[currentSlide].title}
                                </h3>
                                <p className="text-xl opacity-95 leading-relaxed drop-shadow-sm">
                                    {slides[currentSlide].subtitle}
                                </p>
                            </div>

                            {/* Enhanced Slide Indicators */}
                            <div className="flex justify-center space-x-4">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`relative transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'w-8 h-3 bg-white rounded-full scale-110 shadow-lg' 
                                                : 'w-3 h-3 bg-white bg-opacity-60 rounded-full hover:bg-opacity-80 hover:scale-125'
                                        }`}
                                    >
                                        {currentSlide === index && (
                                            <div className="absolute -inset-1 bg-white bg-opacity-30 rounded-full blur-sm"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-8 right-8 w-12 h-12 bg-white bg-opacity-20 rounded-2xl animate-pulse backdrop-blur-sm border border-white border-opacity-10"></div>
                    <div className="absolute bottom-8 left-8 w-10 h-10 bg-white bg-opacity-20 rounded-xl animate-pulse delay-75 backdrop-blur-sm border border-white border-opacity-10"></div>
                    <div className="absolute top-1/2 left-12 w-8 h-8 bg-white bg-opacity-20 rounded-lg animate-pulse delay-150 backdrop-blur-sm border border-white border-opacity-10"></div>
                    <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white bg-opacity-20 rounded-md animate-pulse delay-300 backdrop-blur-sm border border-white border-opacity-10"></div>
                    <div className="absolute bottom-1/4 right-12 w-4 h-4 bg-white bg-opacity-20 rounded animate-pulse delay-500 backdrop-blur-sm"></div>
                </div>
            </div>

            {/* Premium Call to Action */}
            <div className="relative px-10 py-8 bg-black bg-opacity-10 backdrop-blur-sm border-t border-white border-opacity-20">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="text-white mb-6 sm:mb-0">
                        <h4 className="font-bold text-2xl mb-2 drop-shadow-sm">Ready to join our supportive community?</h4>
                        <p className="text-white text-opacity-90 text-lg drop-shadow-sm">Connect with women who understand your journey.</p>
                    </div>
                    <div className="flex space-x-5">
                        
                         <Link
                                  to='/support-groups'
                                  className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200"
                                >
                                <button className="group relative bg-white text-purple-600 font-bold px-8 py-4 rounded-2xl hover:bg-opacity-90 transition-all duration-300 shadow-xl text-lg overflow-hidden">
                            <span className="relative z-10">Join Support Group</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                                </Link>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatMakesUsDifferent;