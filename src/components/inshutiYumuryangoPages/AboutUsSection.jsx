import React from "react";
import Ourstory from "../images/ourstory.jpeg"

const AboutUsSection = () => {
    return (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">About Inshuti Y'umubyeyi</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Empowering women through community, care, and compassion
                    </p>
                </div>

                {/* Vision, Mission, Promise Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Vision Card */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="h-56 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                </svg>
                                <h4 className="text-xl font-semibold">Vision Placeholder</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
                            <p className="text-gray-600 mb-4">
                                Our vision is to create a supportive environment where women can thrive, gain independence,
                                and contribute positively to society.
                            </p>
                            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center transition-colors">
                                Read more
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="h-56 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                                <h4 className="text-xl font-semibold">Mission Placeholder</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
                            <p className="text-gray-600 mb-4">
                                We are committed to restoring confidence and empowering pregnant women facing societal stigma through support groups
                                and skill-building opportunities.
                            </p>
                            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center transition-colors">
                                Read more
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Promise Card */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="h-56 bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                                </svg>
                                <h4 className="text-xl font-semibold">Care Placeholder</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">We Teach, We Care, We Help</h3>
                            <p className="text-gray-600 mb-4">
                                We provide comprehensive support through education, emotional care, and practical assistance to help women build better futures.
                            </p>
                            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center transition-colors">
                                Read more
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Content */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Story</h2>
                                <h3 className="text-xl font-semibold text-purple-600 mb-6">Who We Are</h3>
                            </div>
                            
                            <div className="mb-8">
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Inshuti Y'umubyeyi is a supportive project dedicated to disadvantaged pregnant women, 
                                    offering access to community groups, training and a marketplace to boost their confidence and skills.
                                    Our aim is to empower women through community connections and training events. 
                                    Join us in making a difference.
                                </p>
                            </div>
                            
                          
                        </div>

                        {/* Image */}
                        <div className="min-h-[400px] lg:min-h-full">
                            <img 
                                src={Ourstory} 
                                alt="Our Story - Inshuti Y'umubyeyi community" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { number: "500+", label: "Women Supported" },
                        { number: "50+", label: "Support Groups" },
                        { number: "100+", label: "Skills Trained" },
                        { number: "5+", label: "Years of Service" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;