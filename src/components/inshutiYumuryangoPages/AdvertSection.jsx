import React from "react";

const FeatureSection = () => {
    const features = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            title: "Support Groups",
            description: "Join safe spaces where women share experiences and find community healing together.",
            link: "/support-groups"
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3a4 4 0 118 0v4m-4 4v8m-6 0h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
            ),
            title: "Workshops & Events",
            description: "Attend empowering workshops on mindfulness, self-care, and mental wellness strategies.",
            link: "/workshops"
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                </svg>
            ),
            title: "Skill Development",
            description: "Learn coping strategies, emotional regulation, and resilience-building techniques.",
            link: "/skill-training"
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
            ),
            title: "Privacy & Safety",
            description: "Your confidentiality is protected with our secure, judgment-free environment.",
            link: "/privacy-policy"
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                    />
                </svg>
            ),
            title: "Resources & Blog",
            description: "Access articles, guides, and resources specifically curated for women's mental wellness.",
            link: "/resources"
        },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Supporting Women's Mental Wellness
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our comprehensive services designed specifically for women's unique mental health needs
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="mb-4">
                                <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Learn More Link */}
                            <a
                                href={feature.link}
                                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-300 group-hover:underline"
                            >
                                Learn More
                                <svg
                                    className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-6">
                        Ready to begin your wellness journey?
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                        Get Started Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;