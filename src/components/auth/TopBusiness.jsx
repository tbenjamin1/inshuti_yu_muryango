import React, { useEffect, useState } from 'react';

const TopBusiness = ({ allBusinessesRegisteredList }) => {
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(8);

    // Sample product data with relevant content
    const products = [
        {
            id: 1,
            name: "Maternity Care Package",
            category: "Healthcare",
            status: "Available",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Childcare Support Program",
            category: "Support Services",
            status: "Available",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Skills Training Workshop",
            category: "Education",
            status: "Available",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Community Support Group",
            category: "Mental Health",
            status: "Available",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Financial Literacy Program",
            category: "Finance",
            status: "Available",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Nutritional Guidance",
            category: "Health & Wellness",
            status: "Available",
            image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 7,
            name: "Prenatal Education",
            category: "Education",
            status: "Available",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 8,
            name: "Career Development",
            category: "Professional Growth",
            status: "Available",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 9,
            name: "Mental Health Counseling",
            category: "Mental Health",
            status: "Available",
            image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 10,
            name: "Parenting Classes",
            category: "Education",
            status: "Available",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop&crop=center"
        }
    ];

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [allBusinessesRegisteredList]);

    const loadMore = () => {
        setVisibleProducts(prev => Math.min(prev + 4, products.length));
    };

    const ProductCard = ({ product }) => (
        <div className="group bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.status}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    {product.name}
                </h3>
                <p className="text-white text-opacity-80 text-sm mb-3 capitalize">
                    {product.category}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-white text-opacity-70 text-xs">
                        Status: {product.status}
                    </span>
                    <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );

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

    return (
        <div className="bg-gradient-to-br from-purple-400 via-purple-400 to-blue-400 rounded-3xl p-8 shadow-2xl">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="relative inline-block">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Our Programs & Services
                    </h2>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white bg-opacity-60 rounded-full"></div>
                </div>
                <p className="text-white text-opacity-90 text-xl mt-6 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                    Discover our comprehensive range of support programs designed specifically for empowering women and strengthening communities
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {loading ? (
                    // Loading state
                    Array.from({ length: 8 }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))
                ) : (
                    // Product cards
                    products.slice(0, visibleProducts).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>

            {/* Load More Section */}
            {!loading && visibleProducts < products.length && (
                <div className="text-center">
                    <button
                        onClick={loadMore}
                        className="group relative bg-white bg-opacity-20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-opacity-30 transition-all duration-300 shadow-xl text-lg backdrop-blur-md border border-white border-opacity-20 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Load More Programs</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    <p className="text-white text-opacity-70 mt-4 text-sm">
                        Showing {visibleProducts} of {products.length} programs
                    </p>
                </div>
            )}

            {/* Stats Section */}
           
        </div>
    );
};

export default TopBusiness;