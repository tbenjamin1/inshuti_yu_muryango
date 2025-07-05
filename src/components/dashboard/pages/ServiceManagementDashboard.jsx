import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Filter, Save, X, Upload, Power, PowerOff, AlertCircle, CheckCircle } from 'lucide-react';
import DashboardHome from "../DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsynServices,
  getAllPaginatedServices,
  getAllServices,
  getIsLoadingServices,
  getUser,
} from '../../../redux/transactions/TransactionSlice';

// API Configuration
const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

// Custom hook for notifications
const useNotification = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  }, []);

  return { notification, showNotification };
};

// API service functions
const apiService = {
  // Create service
  createService: async (token, serviceData) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach(key => {
      if (serviceData[key] !== null && serviceData[key] !== undefined) {
        formData.append(key, serviceData[key]);
      }
    });

    const response = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Update service
  updateService: async (token, serviceId, serviceData) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach(key => {
      if (serviceData[key] !== null && serviceData[key] !== undefined) {
        formData.append(key, serviceData[key]);
      }
    });

    const response = await fetch(`${API_BASE}/services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Delete service
  deleteService: async (token, serviceId) => {

    console.log(token)
    const response = await fetch(`${API_BASE}/services/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Toggle service status
  toggleServiceStatus: async (token, serviceId, action) => {
    const response = await fetch(`${API_BASE}/services/${serviceId}/${action}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};

// Notification Component
const Notification = ({ notification }) => {
  if (!notification.show) return null;

  const bgColor = notification.type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const Icon = notification.type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300`}>
      <Icon className="w-5 h-5" />
      <span>{notification.message}</span>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading services...</p>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ searchTerm, onCreateService }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      {searchTerm ? 'No services found' : 'No services available'}
    </h3>
    <p className="text-gray-600 mb-6">
      {searchTerm ? 'Try adjusting your search or filters' : 'Get started by creating your first service'}
    </p>
    {!searchTerm && (
      <button
        onClick={onCreateService}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 inline-flex items-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Create Your First Service
      </button>
    )}
  </div>
);

// Service Card Component
const ServiceCard = ({ service, onEdit, onDelete, onToggleStatus }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center overflow-hidden">
          {service.icon ? (
            <img 
              src={service.icon} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-pink-500 font-bold text-lg">
                {service.title?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleStatus(service)}
            className={`p-2 rounded-lg transition-colors ${
              service.is_active 
                ? 'text-green-600 hover:text-green-800 hover:bg-green-50' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            title={service.is_active ? 'Deactivate' : 'Activate'}
          >
            {service.is_active ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(service)}
            className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
            title="Edit Service"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(service)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Service"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          service.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {service.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-2 font-medium">
        {service.subtitle}
      </p>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
        {service.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
          {service.formatted_members || `${service.total_members || 0} members`}
        </span>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
          {service.formatted_groups || `${service.total_groups || 0} groups`}
        </span>
      </div>
      
      <p className="text-xs text-gray-400">
        Created: {new Date(service.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

// Main Component
const ServiceManagementDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  const { notification, showNotification } = useNotification();

  const servicesList = useSelector(getAllServices);
  const paginatedServicesList = useSelector(getAllPaginatedServices);
  const isLoadingServices = useSelector(getIsLoadingServices);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    is_active: true,
    icon: null
  });

  // Fetch services on component mount
  useEffect(() => {
    if (token) {
      dispatch(fetchAsynServices({ token }));
    }
  }, [dispatch, token]);

  // Filter services based on search and status
  const filteredServices = servicesList?.filter(service => {
    const matchesSearch = service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && service.is_active) ||
                         (filterStatus === 'inactive' && !service.is_active);
    return matchesSearch && matchesStatus;
  }) || [];

  // Reset form
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      is_active: true,
      icon: null
    });
  }, []);

  // Create new service
  const handleCreateService = useCallback(() => {
    setEditingService(null);
    resetForm();
    setShowModal(true);
  }, [resetForm]);

  // Edit existing service
  const handleEditService = useCallback((service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      subtitle: service.subtitle || '',
      description: service.description || '',
      is_active: service.is_active || true,
      icon: null // Reset icon for editing
    });
    setShowModal(true);
  }, []);

  // Save service (create or update)
  const handleSaveService = useCallback(async () => {
    if (!formData.title?.trim() || !formData.subtitle?.trim() || !formData.description?.trim()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const serviceData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        is_active: formData.is_active,
        ...(formData.icon && { icon: formData.icon })
      };

      if (editingService) {
        await apiService.updateService(token, editingService._id, serviceData);
        showNotification('Service updated successfully!');
      } else {
        await apiService.createService(token, serviceData);
        showNotification('Service created successfully!');
      }

      setShowModal(false);
      resetForm();
      // Refresh services list
      dispatch(fetchAsynServices({ token }));
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification(error.message || 'Error saving service. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingService, token, dispatch, showNotification, resetForm]);

  // Delete service
  const handleDeleteService = useCallback(async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        await apiService.deleteService(token, service._id);
        dispatch(fetchAsynServices({ token }));
        showNotification('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        showNotification(error.message || 'Error deleting service. Please try again.', 'error');
      }
    }
  }, [token, dispatch, showNotification]);

  // Toggle service status
  const handleToggleStatus = useCallback(async (service) => {
    try {
      const action = service.is_active ? 'deactivate' : 'activate';
      await apiService.toggleServiceStatus(token, service._id, action);
      dispatch(fetchAsynServices({ token }));
      showNotification(`Service ${action}d successfully!`);
    } catch (error) {
      console.error('Error toggling service status:', error);
      showNotification(error.message || 'Error updating service status. Please try again.', 'error');
    }
  }, [token, dispatch, showNotification]);

  // Handle file input change
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showNotification('Please select a valid image file (JPEG, PNG, GIF, or WebP)', 'error');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Please select an image smaller than 5MB', 'error');
        return;
      }
      
      setFormData(prev => ({...prev, icon: file}));
    }
  }, [showNotification]);

  // Handle modal close
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingService(null);
    resetForm();
  }, [resetForm]);

  // Calculate statistics
  const activeServices = servicesList?.filter(s => s.is_active) || [];
  const inactiveServices = servicesList?.filter(s => !s.is_active) || [];
  const totalParticipants = servicesList?.reduce((sum, s) => sum + (s.total_members || 0), 0) || 0;

  if (isLoadingServices) {
    return (
      <DashboardHome>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
          <div className="max-w-7xl mx-auto">
            <LoadingSpinner />
          </div>
        </div>
      </DashboardHome>
    );
  }

  return (
    <DashboardHome>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Notification notification={notification} />
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Management Dashboard</h1>
            <p className="text-gray-600">Manage your mental health services and programs</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Services</p>
                  <p className="text-2xl font-bold text-gray-900">{servicesList?.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <Power className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-gray-900">{activeServices.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <PowerOff className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Inactive Services</p>
                  <p className="text-2xl font-bold text-gray-900">{inactiveServices.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">{totalParticipants}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={handleCreateService}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Service
              </button>
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={handleDeleteService}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              searchTerm={searchTerm} 
              onCreateService={handleCreateService}
            />
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingService ? 'Edit Service' : 'Create New Service'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter service title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Subtitle <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({...prev, subtitle: e.target.value}))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter service subtitle"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter service description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.is_active}
                      onChange={(e) => setFormData(prev => ({...prev, is_active: e.target.value === 'true'}))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Icon
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="icon-upload"
                      />
                      <label
                        htmlFor="icon-upload"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-5 h-5" />
                        Choose Icon
                      </label>
                      {formData.icon && (
                        <span className="text-sm text-gray-600">
                          {formData.icon.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveService}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingService ? 'Update Service' : 'Create Service'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardHome>
  );
};

export default ServiceManagementDashboard;