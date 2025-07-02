import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Filter, Save, X } from 'lucide-react';
import DashboardHome from "../DashboardLayout";

const ServiceManagementDashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Support Groups',
      description: 'Join safe spaces where women share experiences and find community healing together.',
      category: 'Community',
      status: 'active',
      icon: 'people',
      gradient: 'from-rose-400 to-pink-400',
      createdAt: '2024-01-15',
      participants: 45
    },
    {
      id: 2,
      title: 'Workshops & Events',
      description: 'Attend empowering workshops on mindfulness, self-care, and mental wellness strategies.',
      category: 'Education',
      status: 'active',
      icon: 'chart',
      gradient: 'from-pink-400 to-purple-400',
      createdAt: '2024-01-10',
      participants: 32
    },
    {
      id: 3,
      title: 'Skill Development',
      description: 'Learn coping strategies, emotional regulation, and resilience-building techniques.',
      category: 'Training',
      status: 'active',
      icon: 'search',
      gradient: 'from-purple-400 to-rose-400',
      createdAt: '2024-01-08',
      participants: 28
    },
    {
      id: 4,
      title: 'Privacy & Safety',
      description: 'Your confidentiality is protected with our secure, judgment-free environment.',
      category: 'Security',
      status: 'active',
      icon: 'shield',
      gradient: 'from-rose-400 to-pink-400',
      createdAt: '2024-01-05',
      participants: 0
    },
    {
      id: 5,
      title: 'Resources & Blog',
      description: 'Access our comprehensive library of mental health resources, articles, and wellness guides.',
      category: 'Resources',
      status: 'draft',
      icon: 'document',
      gradient: 'from-pink-400 to-purple-400',
      createdAt: '2024-01-12',
      participants: 67
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Community',
    status: 'active',
    icon: 'people',
    gradient: 'from-rose-400 to-pink-400'
  });

  const categories = ['Community', 'Education', 'Training', 'Security', 'Resources'];
  const iconOptions = ['people', 'chart', 'search', 'shield', 'document'];
  const gradientOptions = [
    'from-rose-400 to-pink-400',
    'from-pink-400 to-purple-400',
    'from-purple-400 to-rose-400',
    'from-blue-400 to-purple-400',
    'from-green-400 to-blue-400'
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateService = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      category: 'Community',
      status: 'active',
      icon: 'people',
      gradient: 'from-rose-400 to-pink-400'
    });
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      status: service.status,
      icon: service.icon,
      gradient: service.gradient
    });
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
    } else {
      const newService = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        participants: 0
      };
      setServices([...services, newService]);
    }
    setShowModal(false);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const getIconSvg = (iconType) => {
    const icons = {
      people: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.64 7 14.31 7.14 14.05 7.36L12 9.41L9.95 7.36C9.69 7.14 9.36 7 9 7H3V9L9 9L12 12L15 9H21ZM12 13.5C11.2 13.5 10.5 14.2 10.5 15S11.2 16.5 12 16.5 13.5 15.8 13.5 15 12.8 13.5 12 13.5Z",
      chart: "M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z",
      search: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z",
      shield: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.4 14.8 17.4H9.2C8.6 17.4 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.5H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z",
      document: "M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
    };
    return icons[iconType] || icons.people;
  };

  return (
    <DashboardHome>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
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
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Draft Services</p>
                <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.status === 'draft').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-gray-900">{services.reduce((sum, s) => sum + s.participants, 0)}</p>
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
                <option value="draft">Draft</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center`}>
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={getIconSvg(service.icon)} />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {service.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                  <span>{service.participants} participants</span>
                </div>
                
                <p className="text-xs text-gray-400">
                  Created: {new Date(service.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
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
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter service title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter service description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <div className="grid grid-cols-5 gap-3">
                    {iconOptions.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({...formData, icon})}
                        className={`p-4 border-2 rounded-lg transition-colors ${
                          formData.icon === icon 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <svg className="w-6 h-6 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d={getIconSvg(icon)} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Gradient</label>
                  <div className="grid grid-cols-5 gap-3">
                    {gradientOptions.map(gradient => (
                      <button
                        key={gradient}
                        type="button"
                        onClick={() => setFormData({...formData, gradient})}
                        className={`h-12 rounded-lg bg-gradient-to-r ${gradient} border-2 transition-all ${
                          formData.gradient === gradient 
                            ? 'border-gray-800 scale-105' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingService ? 'Update Service' : 'Create Service'}
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