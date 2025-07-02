import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, X, User, Mail, Phone, Calendar, Shield, AlertCircle, UserCheck, UserX, Download, Save } from 'lucide-react';
import DashboardHome from "../DashboardLayout";

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@email.com', phone: '+1 (555) 123-4567', role: 'participant', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-07-01', services: ['Support Groups', 'Workshops'], avatar: 'SJ', location: 'New York, NY', age: 29, emergencyContact: 'John Johnson - +1 (555) 123-4568' },
    { id: 2, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@email.com', phone: '+1 (555) 234-5678', role: 'moderator', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-07-02', services: ['Support Groups', 'Privacy'], avatar: 'ED', location: 'Los Angeles, CA', age: 34, emergencyContact: 'Mike Davis - +1 (555) 234-5679' },
    { id: 3, firstName: 'Maria', lastName: 'Rodriguez', email: 'maria.rodriguez@email.com', phone: '+1 (555) 345-6789', role: 'participant', status: 'inactive', joinDate: '2024-01-08', lastLogin: '2024-06-15', services: ['Skill Development'], avatar: 'MR', location: 'Chicago, IL', age: 26, emergencyContact: 'Carlos Rodriguez - +1 (555) 345-6790' },
    { id: 4, firstName: 'Dr. Jennifer', lastName: 'Chen', email: 'dr.jennifer.chen@email.com', phone: '+1 (555) 456-7890', role: 'admin', status: 'active', joinDate: '2024-01-05', lastLogin: '2024-07-02', services: ['All Services'], avatar: 'JC', location: 'San Francisco, CA', age: 42, emergencyContact: 'David Chen - +1 (555) 456-7891' },
    { id: 5, firstName: 'Ashley', lastName: 'Williams', email: 'ashley.williams@email.com', phone: '+1 (555) 567-8901', role: 'participant', status: 'pending', joinDate: '2024-07-01', lastLogin: 'Never', services: [], avatar: 'AW', location: 'Miami, FL', age: 31, emergencyContact: 'Robert Williams - +1 (555) 567-8902' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', role: 'participant', 
    status: 'active', location: '', age: '', emergencyContact: ''
  });

  const roles = ['participant', 'moderator', 'admin'];
  const statuses = ['active', 'inactive', 'pending', 'suspended'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', role: 'participant', status: 'active', location: '', age: '', emergencyContact: '' });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, role: user.role, status: user.status, location: user.location, age: user.age, emergencyContact: user.emergencyContact });
    setShowModal(true);
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...formData, avatar: formData.firstName.charAt(0) + formData.lastName.charAt(0) } : user));
    } else {
      const newUser = { id: Math.max(...users.map(u => u.id)) + 1, ...formData, joinDate: new Date().toISOString().split('T')[0], lastLogin: 'Never', services: [], avatar: formData.firstName.charAt(0) + formData.lastName.charAt(0) };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
  };

  const getStatusColor = (status) => {
    const colors = { active: 'bg-green-100 text-green-800', inactive: 'bg-gray-100 text-gray-800', pending: 'bg-yellow-100 text-yellow-800', suspended: 'bg-red-100 text-red-800' };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role) => {
    const colors = { admin: 'bg-purple-100 text-purple-800', moderator: 'bg-blue-100 text-blue-800', participant: 'bg-pink-100 text-pink-800' };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const exportUsers = () => {
    const csvContent = [['Name', 'Email', 'Phone', 'Role', 'Status', 'Join Date', 'Last Login', 'Location'], 
      ...filteredUsers.map(user => [`${user.firstName} ${user.lastName}`, user.email, user.phone, user.role, user.status, user.joinDate, user.lastLogin, user.location])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ icon: Icon, title, value, gradient }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
      <div className="flex items-center">
        <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardHome>
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage platform users, roles, and permissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard icon={User} title="Total Users" value={users.length} gradient="bg-gradient-to-r from-pink-400 to-purple-400" />
          <StatCard icon={UserCheck} title="Active Users" value={users.filter(u => u.status === 'active').length} gradient="bg-gradient-to-r from-green-400 to-blue-400" />
          <StatCard icon={AlertCircle} title="Pending" value={users.filter(u => u.status === 'pending').length} gradient="bg-gradient-to-r from-yellow-400 to-orange-400" />
          <StatCard icon={Shield} title="Admins" value={users.filter(u => u.role === 'admin').length} gradient="bg-gradient-to-r from-purple-400 to-pink-400" />
          <StatCard icon={UserX} title="Inactive" value={users.filter(u => u.status === 'inactive').length} gradient="bg-gradient-to-r from-red-400 to-pink-400" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option value="all">All Status</option>
                {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
              </select>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option value="all">All Roles</option>
                {roles.map(role => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={exportUsers} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />Export
              </button>
              <button onClick={handleCreateUser} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 font-medium">
                <Plus className="w-5 h-5" />Add User
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select value={user.status} onChange={(e) => handleStatusChange(user.id, e.target.value)} 
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(user.status)} focus:ring-2 focus:ring-pink-500`}>
                        {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastLogin === 'Never' ? <span className="text-gray-500">Never</span> : new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.services.length} services</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        <button onClick={() => handleViewUser(user)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEditUser(user)} className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={editingUser ? 'Edit User' : 'Create New User'}>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter first name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter last name" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter email address" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter age" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter location (City, State)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input type="text" value={formData.emergencyContact} onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Name - Phone Number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {roles.map(role => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                {statuses.map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button onClick={() => setShowModal(false)} className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSaveUser} className="flex-1 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            {editingUser ? 'Update User' : 'Create User'}
          </button>
        </div>
      </Modal>

      <Modal show={showViewModal} onClose={() => setShowViewModal(false)} title="User Details">
        {viewingUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {viewingUser.avatar}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{viewingUser.firstName} {viewingUser.lastName}</h3>
                <p className="text-gray-500">{viewingUser.location}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(viewingUser.role)}`}>
                    {viewingUser.role}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingUser.status)}`}>
                    {viewingUser.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{viewingUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{viewingUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-gray-900">{viewingUser.age} years old</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-gray-900">{new Date(viewingUser.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="text-gray-900">
                      {viewingUser.lastLogin === 'Never' ? 'Never' : new Date(viewingUser.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Emergency Contact</p>
                    <p className="text-gray-900">{viewingUser.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Services</h4>
              <div className="flex flex-wrap gap-2">
                {viewingUser.services.length > 0 ? (
                  viewingUser.services.map((service, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                      {service}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No services assigned</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
    </DashboardHome>
  );
};

export default UserManagementDashboard;