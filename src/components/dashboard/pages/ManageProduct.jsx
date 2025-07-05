import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Search, Save, X, Upload, Eye, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Modal, Image, Tag, Descriptions, Alert, notification } from 'antd';
import DashboardHome from "../DashboardLayout";
import { getUser } from "../../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const ManageProduct = () => {
  const user = useSelector(getUser);
  const token = user?.token;
  const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

  const [state, setState] = useState({
    products: [], categories: [], groups: [], loading: false,
    showModal: false, showDetailsModal: false, editingProduct: null,
    selectedProduct: null, searchTerm: "", filterCategory: "", filterGroup: "",
    currentPage: 1, totalPages: 1, submitting: false, error: null, success: null
  });

  const [formData, setFormData] = useState({
    name: "", category_id: "", group_id: "", color: "", price: "", 
    quantity: "", expiration_date: "", images: []
  });

  const showMessage = (msg, type) => {
    setState(prev => ({ ...prev, [type]: msg }));
    setTimeout(() => setState(prev => ({ ...prev, [type]: null })), 3000);
  };

  const apiCall = useCallback(async (endpoint, options = {}) => {
    if (!token) return showMessage("Authentication required", "error");
    
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          ...(options.method !== 'GET' && !(options.body instanceof FormData) && { 'Content-Type': 'application/json' })
        },
        ...options
      });
      
      const data = await response.json();
      if (!response.ok) {
        const errorMap = {
          401: "Session expired", 403: "Permission denied", 404: "Not found",
          422: data.message || "Validation failed"
        };
        throw new Error(errorMap[response.status] || `Error ${response.status}`);
      }
      return data;
    } catch (error) {
      showMessage(error.message || "Operation failed", "error");
      return null;
    }
  }, [token]);

  const fetchData = useCallback(async (endpoint, key, params = {}) => {
    setState(prev => ({ ...prev, loading: true }));
    const queryParams = new URLSearchParams(params).toString();
    const data = await apiCall(`${endpoint}${queryParams ? `?${queryParams}` : ''}`);
    
    if (data?.success) {
      setState(prev => ({ 
        ...prev, 
        [key]: data.data || data[key] || [],
        ...(data.pagination && { currentPage: data.pagination.current_page, totalPages: data.pagination.total_pages })
      }));
    }
    setState(prev => ({ ...prev, loading: false }));
  }, [apiCall]);

  useEffect(() => {
    if (token) {
      fetchData('/categories', 'categories');
      fetchData('/groups', 'groups');
      fetchData('/products', 'products', { page: 1, limit: 10 });
    }
  }, [token, fetchData]);

  const searchProducts = useCallback(() => {
    const params = { page: 1, limit: 10 };
    if (state.searchTerm) params.search = state.searchTerm;
    if (state.filterCategory) params.category_id = state.filterCategory;
    if (state.filterGroup) params.group_id = state.filterGroup;
    fetchData('/products', 'products', params);
  }, [state.searchTerm, state.filterCategory, state.filterGroup, fetchData]);

  const validateForm = () => {
    const errors = [];
    if (!formData.name?.trim()) errors.push("Product name required");
    if (!formData.category_id) errors.push("Category required");
    if (!formData.group_id) errors.push("Group required");
    if (!formData.price || parseFloat(formData.price) <= 0) errors.push("Valid price required");
    if (!formData.quantity || parseInt(formData.quantity) < 0) errors.push("Valid quantity required");
    
    if (errors.length > 0) {
      showMessage(errors.join(", "), "error");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (state.error) setState(prev => ({ ...prev, error: null }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        showMessage(`Invalid file type: ${file.name}`, "error");
        return false;
      }
      if (file.size > maxSize) {
        showMessage(`File too large: ${file.name}`, "error");
        return false;
      }
      return true;
    });
    
    if (validFiles.length === 0) return;
    
    Promise.all(validFiles.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve({ name: file.name, type: file.type, data: e.target.result });
      reader.readAsDataURL(file);
    }))).then(fileData => {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...fileData] }));
    });
  };

  const openModal = (product = null) => {
    setState(prev => ({ ...prev, showModal: true, editingProduct: product, error: null }));
    setFormData(product || { name: "", category_id: "", group_id: "", color: "", price: "", quantity: "", expiration_date: "", images: [] });
  };

  const closeModal = () => {
    setState(prev => ({ ...prev, showModal: false, showDetailsModal: false, editingProduct: null, selectedProduct: null, error: null, submitting: false }));
    setFormData({ name: "", category_id: "", group_id: "", color: "", price: "", quantity: "", expiration_date: "", images: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setState(prev => ({ ...prev, submitting: true, error: null }));
  
    try {
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
        } else if (value !== '' && value !== null) {
          formDataToSend.append(key, value);
        }
      });
  
      const endpoint = state.editingProduct
        ? `/products/${state.editingProduct._id}`
        : '/products';
  
      const response = await apiCall(endpoint, {
        method: state.editingProduct ? 'PUT' : 'POST',
        body: formDataToSend
      });
      
  
      console.log("response",response);
  
      if (response?.success) {
        notification.success({
          message: "successfully ",
          description: 'successfully',
        });
        closeModal();
        searchProducts();
      } else {
        // If API returns error message but not throwing an exception
        showMessage(response?.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      console.log('Submission error:', error.response);
      showMessage('An unexpected error occurred. Please try again later.', 'error');
      setState(prev => ({ ...prev, error: error.message || 'Unknown error' }));
    } finally {
      setState(prev => ({ ...prev, submitting: false }));
    }
  };
  

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    const response = await apiCall(`/products/${id}`, { method: 'DELETE' });
    if (response?.success) {
      showMessage("Product deleted successfully!", "success");
      searchProducts();
    }
  };

  const toggleStatus = async (id) => {
    const response = await apiCall(`/products/${id}/toggle-status`, { method: 'PATCH' });
    if (response?.success) {
      showMessage("Status updated!", "success");
      searchProducts();
    }
  };

  if (state.loading && !state.products.length) {
    return (
      <DashboardHome>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading products...</span>
        </div>
      </DashboardHome>
    );
  }

  return (
    <DashboardHome>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Messages */}
          {state.error && (
            <Alert message="Error" description={state.error} type="error" showIcon closable 
              onClose={() => setState(prev => ({ ...prev, error: null }))} className="mb-4" />
          )}
          {state.success && (
            <Alert message="Success" description={state.success} type="success" showIcon closable 
              onClose={() => setState(prev => ({ ...prev, success: null }))} className="mb-4" />
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <button onClick={() => openModal()} disabled={state.loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
              <Plus size={20} />Add Product
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search products..." value={state.searchTerm}
                  onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <select value={state.filterCategory} onChange={(e) => setState(prev => ({ ...prev, filterCategory: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                {state.categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              <select value={state.filterGroup} onChange={(e) => setState(prev => ({ ...prev, filterGroup: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Groups</option>
                {state.groups.map(group => <option key={group._id} value={group._id}>{group.name}</option>)}
              </select>
              <button onClick={searchProducts} disabled={state.loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
                {state.loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}Search
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Product', 'Category', 'Group', 'Price', 'Quantity', 'Status', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {state.products.map(product => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {product.images?.[0] && (
                          <img src={product.images[0].image_url} alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.color}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Tag color="blue">{product.category_id?.name}</Tag></td>
                    <td className="px-6 py-4"><Tag color="green">{product.group_id?.name}</Tag></td>
                    <td className="px-6 py-4 font-medium">RWF{product.price}</td>
                    <td className="px-6 py-4">
                      <Tag color={product.quantity > 50 ? 'green' : product.quantity > 10 ? 'orange' : 'red'}>
                        {product.quantity}
                      </Tag>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleStatus(product._id)} disabled={state.loading}
                        className={`px-3 py-1 text-xs rounded-full disabled:opacity-50 ${
                          product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => setState(prev => ({ ...prev, showDetailsModal: true, selectedProduct: product }))}
                          className="text-green-600 hover:text-green-900 p-1" title="View">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openModal(product)} disabled={state.loading}
                          className="text-blue-600 hover:text-blue-900 p-1 disabled:opacity-50" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => deleteProduct(product._id)} disabled={state.loading}
                          className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {state.totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: state.totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => {
                  setState(prev => ({ ...prev, currentPage: page }));
                  fetchData('/products', 'products', { page, limit: 10 });
                }} disabled={state.loading}
                  className={`px-3 py-1 rounded disabled:opacity-50 ${
                    page === state.currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                  {page}
                </button>
              ))}
            </div>
          )}

          {/* Modal */}
          {state.showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{state.editingProduct ? "Edit Product" : "Add New Product"}</h2>
                    <button onClick={closeModal} disabled={state.submitting} className="text-gray-400 hover:text-gray-600">
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required 
                          disabled={state.submitting} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                        <input type="text" name="color" value={formData.color} onChange={handleInputChange} disabled={state.submitting}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required step="0.01" min="0" 
                          disabled={state.submitting} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="0" 
                          disabled={state.submitting} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select name="category_id" value={formData.category_id} onChange={handleInputChange} required disabled={state.submitting}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
                          <option value="">Select Category</option>
                          {state.categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group *</label>
                        <select name="group_id" value={formData.group_id} onChange={handleInputChange} required disabled={state.submitting}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
                          <option value="">Select Group</option>
                          {state.groups.map(group => <option key={group._id} value={group._id}>{group.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                      <input type="date" name="expiration_date" value={formData.expiration_date} onChange={handleInputChange} 
                        disabled={state.submitting} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <input type="file" accept="image/*" multiple onChange={handleFileChange} disabled={state.submitting}
                          className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2 inline-block ${state.submitting ? 'opacity-50' : ''}`}>
                          Choose Images
                        </label>
                      </div>

                      {formData.images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img src={image.data || image.image_url} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                              <button type="button" onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                                disabled={state.submitting} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 disabled:opacity-50">
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button type="button" onClick={closeModal} disabled={state.submitting}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                        Cancel
                      </button>
                      <button type="submit" disabled={state.submitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50">
                        {state.submitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {state.editingProduct ? "Update" : "Add"} Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Details Modal */}
          <Modal title="Product Details" open={state.showDetailsModal} onCancel={closeModal} footer={null} width={800}>
            {state.selectedProduct && (
              <div className="space-y-4">
                {state.selectedProduct.images?.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {state.selectedProduct.images.map((image, index) => (
                      <Image key={index} src={image.image_url} alt={`${state.selectedProduct.name} ${index + 1}`} 
                        className="rounded-lg object-cover" style={{ width: '100%', height: '120px' }} />
                    ))}
                  </div>
                )}
                <Descriptions bordered column={2} size="small">
                  <Descriptions.Item label="Name" span={2}>{state.selectedProduct.name}</Descriptions.Item>
                  <Descriptions.Item label="Category"><Tag color="blue">{state.selectedProduct.category_id?.name}</Tag></Descriptions.Item>
                  <Descriptions.Item label="Group"><Tag color="green">{state.selectedProduct.group_id?.name}</Tag></Descriptions.Item>
                  <Descriptions.Item label="Color">{state.selectedProduct.color}</Descriptions.Item>
                  <Descriptions.Item label="Price">RWF{state.selectedProduct.price}</Descriptions.Item>
                  <Descriptions.Item label="Quantity">
                    <Tag color={state.selectedProduct.quantity > 50 ? 'green' : state.selectedProduct.quantity > 10 ? 'orange' : 'red'}>
                      {state.selectedProduct.quantity}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={state.selectedProduct.is_active ? 'green' : 'red'}>
                      {state.selectedProduct.is_active ? 'Active' : 'Inactive'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Expiration">{state.selectedProduct.formatted_expiration_date || 'N/A'}</Descriptions.Item>
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