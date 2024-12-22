import React from "react";

const FeatureSection = () => {
    const features = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 21V9.6a1.4 1.4 0 012.8 0V21"
                    />
                </svg>
            ),
            title: "High Quality",
            description: "crafted from top materials",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 18l6-6M10 6l6 6"
                    />
                </svg>
            ),
            title: "Warranty Protection",
            description: "Over 2 years",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16l-4-4 4-4m4 8l4-4-4-4"
                    />
                </svg>
            ),
            title: "Free Shipping",
            description: "Order over 150 $",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                    />
                </svg>
            ),
            title: "24/7 Support",
            description: "Dedicated support",
        },
    ];

    return (
        <div className="bg-white py-6">
            <div className="container_feature mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-0">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-4 text-gray-700 p-4 border rounded-lg shadow-sm"
                    >
                        {/* Icon */}
                        <div className="flex items-center justify-center">
                            {feature.icon}
                        </div>
                        {/* Text */}
                        <div>
                            <h4 className="font-semibold feature_title">{feature.title}</h4>
                            <p className="feature_description">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSection;
