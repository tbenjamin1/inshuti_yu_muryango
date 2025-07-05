import React, { useEffect, useState } from 'react';
import { Star, Heart, Eye, MessageCircle } from 'lucide-react';
import { Modal, Button, Rate,Tag, Skeleton } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynProducts, getAllProducts, getIsLoadingProducts, getUser } from '../../redux/transactions/TransactionSlice';

const ProductListing = ({ title = "Featured Products", subtitle = "Discover amazing products created by our talented Mothers" }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const productsList = useSelector(getAllProducts);
    const isLoadingproducts = useSelector(getIsLoadingProducts);
    const token = user?.token;

    const [visibleProducts, setVisibleProducts] = useState(8);
    const [favorites, setFavorites] = useState(new Set());
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
       
            dispatch(fetchAsynProducts({ currentPage: 1, searchQuery: '', categoryId: '', groupId: '' }));
        
    }, [token, dispatch]);

    const loadMore = () => {
        setVisibleProducts(prev => Math.min(prev + 4, productsList.length));
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

    const handleBuyNow = (product) => {
        const message = `Hi, I'm interested in buying "${product.name}" for RWF ${product.price}. Can you provide more details?`;
        const whatsappUrl = `https://wa.me/250787438701?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const showProductDetails = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const getBadgeColor = (isActive) => {
        return isActive ? 'green' : 'red';
    };

    const ProductCard = ({ product }) => {
        const imageUrl = product.images?.[0]?.image_url || 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg';
        
        return (
            <div className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <img
                        alt={product.name}
                        src={imageUrl}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                            product.is_active 
                                ? 'bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/30' 
                                : 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                        }`}>
                            {product.is_active ? '✓ Available' : '✗ Out of Stock'}
                        </div>
                    </div>

                    {/* Color Indicator */}
                    <div className="absolute top-4 right-4">
                        <div 
                            className="w-6 h-6 rounded-full border-2 border-white/50 shadow-lg backdrop-blur-sm"
                            style={{ backgroundColor: product.color }}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                                favorites.has(product.id) 
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                                    : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                        >
                            <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            onClick={() => showProductDetails(product)}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-100 transition-colors duration-300">
                            {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="text-white/70 text-sm font-medium px-3 py-1 rounded-full bg-white/10">
                                {product.category_id?.name || 'Uncategorized'}
                            </span>
                            <Rate disabled defaultValue={4.5} size="small" className="text-yellow-400" />
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                                {product.group_id?.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <span className="text-white/60 text-sm">
                            by {product.group_id?.name || 'Unknown Group'}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-white font-bold text-2xl">
                                RWF {product.price?.toLocaleString()}
                            </span>
                            <div className="text-white/50 text-xs">
                                Qty: {product.quantity} available
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white/40 text-xs">Expires</div>
                            <div className="text-white/60 text-sm font-medium">
                                {product.formatted_expiration_date}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-2">
                        <button
                            onClick={() => handleBuyNow(product)}
                            disabled={!product.is_active}
                            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl font-medium transition-all duration-300 ${
                                product.is_active
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105'
                                    : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>Buy Now</span>
                        </button>
                        <button
                            onClick={() => showProductDetails(product)}
                            className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const LoadingCard = () => (
        <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden animate-pulse">
            <div className="h-56 bg-white/10 rounded-t-3xl"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-white/20 rounded-lg w-3/4"></div>
                <div className="h-4 bg-white/20 rounded-lg w-1/2"></div>
                <div className="h-4 bg-white/20 rounded-lg w-2/3"></div>
                <div className="flex space-x-3">
                    <div className="flex-1 h-12 bg-white/20 rounded-xl"></div>
                    <div className="w-20 h-12 bg-white/20 rounded-xl"></div>
                </div>
            </div>
        </div>
    );

    const ProductDetailModal = () => (
        <Modal
            title={selectedProduct?.name}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
                <Button key="close" onClick={() => setIsModalVisible(false)}>
                    Close
                </Button>,
                <Button 
                    key="buy" 
                    type="primary" 
                    icon={<MessageCircle className="w-4 h-4" />}
                    onClick={() => {
                        handleBuyNow(selectedProduct);
                        setIsModalVisible(false);
                    }}
                    className="bg-green-500 hover:bg-green-600"
                    disabled={!selectedProduct?.is_active}
                >
                    Buy Now
                </Button>
            ]}
            width={600}
        >
            {selectedProduct && (
                <div>
                    <div className="mb-4">
                        <img
                            src={selectedProduct.images?.[0]?.image_url || 'https://as2.ftcdn.net/jpg/05/97/47/95/1000_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'}
                            alt={selectedProduct.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <Tag color={getBadgeColor(selectedProduct.is_active)}>
                                {selectedProduct.is_active ? 'Available' : 'Out of Stock'}
                            </Tag>
                            <Tag color="blue">{selectedProduct.color}</Tag>
                        </div>
                        <p><strong>Category:</strong> {selectedProduct.category_id?.name || 'Uncategorized'}</p>
                        <p><strong>Seller:</strong> {selectedProduct.group_id?.name || 'Unknown Group'}</p>
                        <p><strong>Price:</strong> <span className="text-2xl font-bold text-green-600">RWF {selectedProduct.price}</span></p>
                        <p><strong>Quantity Available:</strong> {selectedProduct.quantity}</p>
                        <p><strong>Expiration Date:</strong> {selectedProduct.formatted_expiration_date}</p>
                        <div className="flex items-center">
                            <strong className="mr-2">Rating:</strong>
                            <Rate disabled defaultValue={4.5} />
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );

    return (
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
                <p className="text-white text-opacity-90 text-lg max-w-2xl mx-auto">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {isLoadingproducts ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))
                ) : (
                    productsList.slice(0, visibleProducts).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>

            {!isLoadingproducts && visibleProducts < productsList.length && (
                <div className="text-center mb-10">
                    <Button
                        onClick={loadMore}
                        size="large"
                        className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 border-0 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center space-x-2">
                            <span>Load More Products</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </Button>
                    <p className="text-white text-opacity-70 mt-4 text-sm">
                        Showing {visibleProducts} of {productsList.length} products
                    </p>
                </div>
            )}

            <ProductDetailModal />
        </div>
    );
};

export default ProductListing;