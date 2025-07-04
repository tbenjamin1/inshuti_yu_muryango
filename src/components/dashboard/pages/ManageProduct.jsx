import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Search, Save, X, Upload, Eye } from "lucide-react";
import { Modal, Image, Tag, Descriptions, Card, Row, Col } from 'antd';
import DashboardHome from "../DashboardLayout";
import { getUser } from "../../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

  // Consolidated state
  const [state, setState] = useState({
    products: [], categories: [], groups: [], loading: false,
    showModal: false, showDetailsModal: false, editingProduct: null,
    selectedProduct: null, searchTerm: "", filterCategory: "", filterGroup: "",
    currentPage: 1, totalPages: 1, totalItems: 0
  });

  const [formData, setFormData] = useState({
    name: "", category_id: "", group_id: "", color: "", price: "", 
    quantity: "", expiration_date: "", images: []
  });

  const showMessage = (msg, type) => console.log(`${type}: ${msg}`);
  const resetForm = () => setFormData({
    name: "", category_id: "", group_id: "", color: "", price: "", 
    quantity: "", expiration_date: "", images: []
  });

  // Optimized API call function
  const apiCall = useCallback(async (endpoint, options = {}) => {
    if (!token) return showMessage("Authentication required", "error");
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          ...(options.method !== 'GET' && !(options.body instanceof FormData) && {
            'Content-Type': 'application/json'
          }),
          ...(options.headers || {})
        },
        ...options
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`API Error:`, error);
      showMessage("Operation failed", "error");
      return null;
    }
  }, [token]);

  // Data fetching
  const fetchData = useCallback(async (endpoint, key, params = {}) => {
    setState(prev => ({ ...prev, loading: true }));
    const queryParams = new URLSearchParams(params).toString();
    const data = await apiCall(`${endpoint}${queryParams ? `?${queryParams}` : ''}`);
    
    if (data?.success) {
      setState(prev => ({ 
        ...prev, 
        [key]: data.data || data[key] || [],
        ...(data.pagination && {
          currentPage: data.pagination.current_page,
          totalPages: data.pagination.total_pages,
          totalItems: data.pagination.total_items
        })
      }));
    }
    setState(prev => ({ ...prev, loading: false }));
  }, [apiCall]);

  // Load data
  useEffect(() => {
    if (token) {
      fetchData('/categories', 'categories');
      fetchData('/groups', 'groups');
      fetchData('/products', 'products', { page: 1, limit: 10 });
    }
  }, [token, fetchData]);

  // Search products
  const searchProducts = useCallback(() => {
    const params = {
      page: 1, limit: 10,
      ...(state.searchTerm && { search: state.searchTerm }),
      ...(state.filterCategory && { category_id: state.filterCategory }),
      ...(state.filterGroup && { group_id: state.filterGroup })
    };
    fetchData('/products', 'products', params);
  }, [state.searchTerm, state.filterCategory, state.filterGroup, fetchData]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve({
        name: file.name, type: file.type, data: e.target.result
      });
      reader.readAsDataURL(file);
    }))).then(fileData => {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...fileData] }));
    });
  };

  const openModal = (product = null) => {
    setState(prev => ({ 
      ...prev, 
      showModal: true, 
      editingProduct: product 
    }));
    setFormData(product || {
      name: "", category_id: "", group_id: "", color: "", price: "", 
      quantity: "", expiration_date: "", images: []
    });
  };

  const openDetailsModal = (product) => {
    setState(prev => ({ 
      ...prev, 
      showDetailsModal: true, 
      selectedProduct: product 
    }));
  };

  const closeModal = () => {
    setState(prev => ({ 
      ...prev, 
      showModal: false, 
      showDetailsModal: false, 
      editingProduct: null,
      selectedProduct: null
    }));
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        value.forEach(img => {
          if (img.data) {
            const byteCharacters = atob(img.data.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
            const blob = new Blob([new Uint8Array(byteNumbers)], { type: img.type });
            formDataToSend.append('images', blob, img.name);
          }
        });
      } else if (value !== '') {
        formDataToSend.append(key, value);
      }
    });

    const endpoint = state.editingProduct ? `/products/${state.editingProduct._id}` : '/products';
    const response = await apiCall(endpoint, {
      method: state.editingProduct ? 'PUT' : 'POST',
      body: formDataToSend
    });

    if (response?.success) {
      showMessage(state.editingProduct ? "Product updated" : "Product created", "success");
      closeModal();
      searchProducts();
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const response = await apiCall(`/products/${id}`, { method: 'DELETE' });
    if (response?.success) {
      showMessage("Product deleted", "success");
      searchProducts();
    }
  };

  const toggleStatus = async (id) => {
    const response = await apiCall(`/products/${id}/toggle-status`, { method: 'PATCH' });
    if (response?.success) {
      showMessage("Status updated", "success");
      searchProducts();
    }
  };

  const getCategoryName = (id) => state.categories.find(cat => cat._id === id)?.name || "Unknown";
  const getGroupName = (id) => state.groups.find(group => group._id === id)?.name || "Unknown";

  if (state.loading && !state.products.length) {
    return <DashboardHome><div className="flex justify-center items-center h-64">Loading...</div></DashboardHome>;
  }

  return (
    <DashboardHome>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={state.searchTerm}
                  onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={state.filterCategory}
                onChange={(e) => setState(prev => ({ ...prev, filterCategory: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {state.categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <select
                value={state.filterGroup}
                onChange={(e) => setState(prev => ({ ...prev, filterGroup: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Groups</option>
                {state.groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
              <button
                onClick={searchProducts}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Search
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Product', 'Category', 'Group', 'Price', 'Quantity', 'Status', 'Actions'].map(header => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.products.map(product => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.images?.[0] && (
                            <img 
                              src={product.images[0].image_url} 
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.color}</div>
                          </div>
                        </div>
                      </td>
                      {/* state.selectedProduct.category_id?.name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Tag color="blue">{product.category_id?.name}</Tag>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Tag color="green">{product.group_id?.name}</Tag>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        RWF{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Tag color={product.quantity > 50 ? 'green' : product.quantity > 10 ? 'orange' : 'red'}>
                          {product.quantity}
                        </Tag>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStatus(product._id)}
                          className={`px-3 py-1 text-xs rounded-full ${
                            product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openDetailsModal(product)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal(product)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {state.totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: state.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => {
                    setState(prev => ({ ...prev, currentPage: page }));
                    fetchData('/products', 'products', { page, limit: 10 });
                  }}
                  className={`px-3 py-1 rounded ${
                    page === state.currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

          {/* Add/Edit Product Modal */}
          {state.showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                      {state.editingProduct ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <input
                          type="text"
                          name="color"
                          value={formData.color}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Category</option>
                          {state.categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                        <select
                          name="group_id"
                          value={formData.group_id}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Group</option>
                          {state.groups.map(group => (
                            <option key={group._id} value={group._id}>{group.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                        <input
                          type="date"
                          name="expiration_date"
                          value={formData.expiration_date}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2 inline-block"
                        >
                          Choose Images
                        </label>
                      </div>

                      {formData.images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image.data || image.image_url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ 
                                  ...prev, 
                                  images: prev.images.filter((_, i) => i !== index) 
                                }))}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Save size={16} />
                        {state.editingProduct ? "Update" : "Add"} Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Product Details Modal */}
          <Modal
            title={<div className="text-lg font-semibold">Product Details</div>}
            open={state.showDetailsModal}
            onCancel={closeModal}
            footer={null}
            width={800}
          >
            {state.selectedProduct && (
              <div className="space-y-6">
                {/* Product Images */}
                {state.selectedProduct.images?.length > 0 && (
                  <div className="text-center">
                    <Image.PreviewGroup>
                      <Row gutter={[8, 8]}>
                        {state.selectedProduct.images.map((image, index) => (
                          <Col key={index} xs={12} sm={8} md={6}>
                            <Image
                              src={image.image_url}
                              alt={`${state.selectedProduct.name} ${index + 1}`}
                              className="rounded-lg object-cover"
                              style={{ width: '100%', height: '120px' }}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Image.PreviewGroup>
                  </div>
                )}

                {/* Product Information */}
                <Descriptions
                  bordered
                  column={2}
                  size="small"
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  <Descriptions.Item label="Product Name" span={2}>
                    {state.selectedProduct.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    <Tag color="blue">
                      {state.selectedProduct.category_id?.name || getCategoryName(state.selectedProduct.category_id)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Group">
                    <Tag color="green">
                      {state.selectedProduct.group_id?.name || getGroupName(state.selectedProduct.group_id)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: state.selectedProduct.color?.toLowerCase() }}
                      />
                      {state.selectedProduct.color}
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    <span className="text-lg font-semibold text-green-600">
                      ${state.selectedProduct.price}
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Quantity">
                    <Tag color={state.selectedProduct.quantity > 50 ? 'green' : state.selectedProduct.quantity > 10 ? 'orange' : 'red'}>
                      {state.selectedProduct.quantity} units
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={state.selectedProduct.is_active ? 'green' : 'red'}>
                      {state.selectedProduct.is_active ? 'Active' : 'Inactive'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Expiration Date">
                    {state.selectedProduct.formatted_expiration_date || 'N/A'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created Date">
                    {new Date(state.selectedProduct.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expired Status">
                    <Tag color={state.selectedProduct.is_expired ? 'red' : 'green'}>
                      {state.selectedProduct.is_expired ? 'Expired' : 'Valid'}
                    </Tag>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </DashboardHome>
  );
};

export default ManageProduct;