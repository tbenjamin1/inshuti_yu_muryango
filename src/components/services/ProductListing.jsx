import React, { useEffect, useState } from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';

const ProductListing = ({ title = "Featured Products", subtitle = "Discover amazing products created by our talented students" }) => {
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [favorites, setFavorites] = useState(new Set());

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Handwoven Silk Scarf",
            category: "Textile Arts",
            price: 85,
            originalPrice: 120,
            creator: "Sarah Johnson",
            rating: 4.9,
            reviews: 24,
            status: "Available",
            image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop",
            badge: "Best Seller"
        },
        {
            id: 2,
            name: "Digital Art Print Set",
            category: "Digital Art",
            price: 45,
            originalPrice: 60,
            creator: "Michael Chen",
            rating: 4.8,
            reviews: 18,
            status: "Available",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            badge: "New"
        },
        {
            id: 3,
            name: "Leather Bound Journal",
            category: "Paper Crafts",
            price: 65,
            originalPrice: 80,
            creator: "Emma Rodriguez",
            rating: 4.7,
            reviews: 32,
            status: "Available",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
            badge: "Popular"
        },
        {
            id: 4,
            name: "Portrait Photography Session",
            category: "Photography",
            price: 120,
            originalPrice: 150,
            creator: "David Kim",
            rating: 4.9,
            reviews: 15,
            status: "Available",
            image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop",
            badge: "Premium"
        },
        {
            id: 5,
            name: "Custom Music Composition",
            category: "Music Production",
            price: 200,
            originalPrice: 250,
            creator: "Lisa Martinez",
            rating: 5.0,
            reviews: 8,
            status: "Available",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
            badge: "Exclusive"
        },
        {
            id: 6,
            name: "Paper Sculpture Art",
            category: "Paper Crafts",
            price: 75,
            originalPrice: 95,
            creator: "Alex Thompson",
            rating: 4.6,
            reviews: 21,
            status: "Available",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
            badge: "Trending"
        },
        {
            id: 7,
            name: "Ceramic Pottery Set",
            category: "Pottery",
            price: 90,
            originalPrice: 110,
            creator: "Maria Garcia",
            rating: 4.8,
            reviews: 27,
            status: "Available",
            image: "https://images.unsplash.com/photo-1578662015318-d8b3dbc94ab4?w=400&h=300&fit=crop",
            badge: "Handmade"
        },
        {
            id: 8,
            name: "Watercolor Painting",
            category: "Fine Arts",
            price: 150,
            originalPrice: 180,
            creator: "John Wilson",
            rating: 4.7,
            reviews: 19,
            status: "Available",
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
            badge: "Limited Edition"
        },
        {
            id: 9,
            name: "Wooden Jewelry Box",
            category: "Woodworking",
            price: 110,
            originalPrice: 140,
            creator: "Robert Davis",
            rating: 4.9,
            reviews: 23,
            status: "Available",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
            badge: "Artisan"
        },
        {
            id: 10,
            name: "Knitted Winter Sweater",
            category: "Textile Arts",
            price: 95,
            originalPrice: 125,
            creator: "Anne Miller",
            rating: 4.8,
            reviews: 31,
            status: "Available",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
            badge: "Cozy"
        }
    ];

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const loadMore = () => {
        setVisibleProducts(prev => Math.min(prev + 4, products.length));
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const getBadgeColor = (badge) => {
        const colors = {
            "Best Seller": "bg-red-500",
            "New": "bg-green-500",
            "Popular": "bg-blue-500",
            "Premium": "bg-purple-500",
            "Exclusive": "bg-pink-500",
            "Trending": "bg-yellow-500",
            "Handmade": "bg-orange-500",
            "Limited Edition": "bg-indigo-500",
            "Artisan": "bg-teal-500",
            "Cozy": "bg-amber-500"
        };
        return colors[badge] || "bg-gray-500";
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
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`${getBadgeColor(product.badge)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        {product.badge}
                    </span>
                </div>

                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                            favorites.has(product.id) 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                        }`}
                    >
                        <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-all duration-300 backdrop-blur-md">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Status indicator */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.status}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-100 transition-colors duration-300 flex-1 pr-2">
                        {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">{product.rating}</span>
                    </div>
                </div>
                
                <p className="text-white text-opacity-80 text-sm mb-2 capitalize">
                    {product.category}
                </p>
                
                <p className="text-white text-opacity-70 text-xs mb-3">
                    by {product.creator}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xl">
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-white text-opacity-50 text-sm line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                    <span className="text-white text-opacity-70 text-xs">
                        {product.reviews} reviews
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20 flex items-center justify-center space-x-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                    <button className="bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20">
                        View
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
                <div className="bg-white bg-opacity-20 h-4 w-1/2 rounded mb-2"></div>
                <div className="bg-white bg-opacity-20 h-3 w-1/3 rounded mb-3"></div>
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-white bg-opacity-20 h-5 w-16 rounded"></div>
                    <div className="bg-white bg-opacity-20 h-3 w-12 rounded"></div>
                </div>
                <div className="bg-white bg-opacity-20 h-8 w-full rounded"></div>
            </div>
        </div>
    );

    // Calculate stats
    const totalProducts = products.length;
    const averageRating = (products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1);
    const totalReviews = products.reduce((sum, product) => sum + product.reviews, 0);

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 shadow-2xl">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                    {title}
                </h2>
                <p className="text-white text-opacity-90 text-lg max-w-2xl mx-auto">
                    {subtitle}
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
                <div className="text-center mb-10">
                    <button
                        onClick={loadMore}
                        className="group relative bg-white bg-opacity-20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-opacity-30 transition-all duration-300 shadow-xl text-lg backdrop-blur-md border border-white border-opacity-20 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Load More Products</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    <p className="text-white text-opacity-70 mt-4 text-sm">
                        Showing {visibleProducts} of {products.length} products
                    </p>
                </div>
            )}

            
        </div>
    );
};

export default ProductListing;