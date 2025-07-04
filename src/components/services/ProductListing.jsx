import React, { useEffect, useState } from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynProducts, getAllPaginatedProducts, getAllProducts, getIsLoadingProducts, getUser } from '../../redux/transactions/TransactionSlice';

const ProductListing = ({ title = "Featured Products", subtitle = "Discover amazing products created by our talented students" }) => {

     const dispatch = useDispatch();
      const user = useSelector(getUser);
      const productsList = useSelector(getAllProducts);
      const paginatedProductsList = useSelector(getAllPaginatedProducts);
      const isLoadingproducts = useSelector(getIsLoadingProducts);
      const token = user?.token;

  


   
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [favorites, setFavorites] = useState(new Set());

  

    useEffect(() => {

        //  get products currentPage, searchQuery, categoryId, groupId 
        if (token) {
            dispatch(fetchAsynProducts({ currentPage: 1, searchQuery: '', categoryId: '', groupId: '' }));
        }
     
    }, [token,dispatch]);

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
                    src={product.images && product.images.length > 0 ? product.images[0].image_url : 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                    <span className={`${getBadgeColor(product.badge || 'New')} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        {product.badge || 'New'}
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
                        {product.status === 'available' ? 'Available' : 'Out of Stock'}
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
                    {product.category_id
                        ? product.category_id.name
                        : 'Uncategorized'}
                </p>
                
                <p className="text-white text-opacity-70 text-xs mb-3">
                    by {product?.group_id ? product.group_id?.name : 'Unknown Group'}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xl">
                            RWF{product.price}
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
    const totalProducts = productsList.length;
    const averageRating = (productsList.reduce((sum, product) => sum + product.rating, 0) / productsList.length).toFixed(1);
    const totalReviews = productsList.reduce((sum, product) => sum + product.reviews, 0);

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
                {isLoadingproducts ? (
                    // Loading state
                    Array.from({ length: 8 }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))
                ) : (
                    // Product cards
                    productsList.slice(0, visibleProducts).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>

            {/* Load More Section */}
            {!isLoadingproducts && visibleProducts < productsList.length && (
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