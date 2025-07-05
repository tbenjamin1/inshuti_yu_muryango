import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, Select, Avatar, Tag, Space, 
  Card, Statistic, Row, Col, message, Popconfirm, Switch, Drawer
} from 'antd';
import { 
  UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, 
  EyeOutlined, DownloadOutlined, PhoneOutlined, CalendarOutlined,
  TeamOutlined, PoweroffOutlined
} from '@ant-design/icons';
import DashboardHome from "../DashboardLayout";
import { getUser } from '../../../redux/transactions/TransactionSlice';
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;
const { Search } = Input;

const UserManagementDashboard = () => {
  const user = useSelector(getUser);
  const token = user?.token;
  const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [filters, setFilters] = useState({ search: '', role: 'all', status: 'all' });
  const [form] = Form.useForm();

  const setActionLoadingState = (id, state) => {
    setActionLoading(prev => ({ ...prev, [id]: state }));
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(filters.search && { search: filters.search }),
        ...(filters.role !== 'all' && { role: filters.role }),
        ...(filters.status !== 'all' && { active_only: filters.status })
      });

      const response = await fetch(`${API_BASE}/auth/users?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch users');
      
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id) => {
    try {
      setActionLoadingState(`view_${id}`, true);
      const response = await fetch(`${API_BASE}/auth/users/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch user');
      
      const data = await response.json();
      setViewingUser(data);
      setDrawerVisible(true);
    } catch (error) {
      message.error('Failed to load user details');
    } finally {
      setActionLoadingState(`view_${id}`, false);
    }
  };

  const saveUser = async (values) => {
    try {
      const url = editingUser 
        ? `${API_BASE}/auth/users/${editingUser._id}`
        : `${API_BASE}/auth/register`;
      
      const method = editingUser ? 'PUT' : 'POST';
      const body = editingUser ? values : { 
        ...values, 
        username: values.fullName.toLowerCase().replace(/\s+/g, '') 
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save user');
      }

      setModalVisible(false);
      fetchUsers();
      form.resetFields();
      setEditingUser(null);
      message.success(`User ${editingUser ? 'updated' : 'created'} successfully`);
    } catch (error) {
      message.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      setActionLoadingState(`delete_${id}`, true);
      const response = await fetch(`${API_BASE}/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      fetchUsers();
      message.success('User deleted successfully');
    } catch (error) {
      message.error('Failed to delete user');
    } finally {
      setActionLoadingState(`delete_${id}`, false);
    }
  };

  const toggleUserStatus = async (id, isActive) => {
    try {
      setActionLoadingState(`toggle_${id}`, true);
      const endpoint = isActive ? 'activate' : 'deactivate';
      const response = await fetch(`${API_BASE}/auth/users/${id}/${endpoint}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to update user status');
      
      fetchUsers();
      message.success(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      message.error('Failed to update user status');
    } finally {
      setActionLoadingState(`toggle_${id}`, false);
    }
  };

  const exportUsers = () => {
    try {
      const csvContent = [
        ['Name', 'Phone', 'Role', 'Status', 'Created'],
        ...users.map(user => [
          user.fullName || user.username || '',
          user.phone || '',
          user.role || '',
          user.isActive !== false ? 'Active' : 'Inactive',
          new Date(user.createdAt).toLocaleDateString()
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      message.success('Users exported successfully');
    } catch (error) {
      message.error('Failed to export users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleCreateUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue({
      fullName: user.fullName || '',
      phone: user.phone || '',
      role: user.role || 'user',
      isActive: user.isActive !== false
    });
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'fullName',
      key: 'user',
      render: (text, record) => (
        <Space>
          <Avatar 
            style={{ backgroundColor: '#f56a00' }} 
            icon={<UserOutlined />}
          >
            {(text || record.username || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{text || record.username}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>@{record.username}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'purple' : 'pink'}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive, record) => (
        <Switch
          checked={isActive !== false}
          loading={actionLoading[`toggle_${record._id}`]}
          onChange={(checked) => toggleUserStatus(record._id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'created',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />}
            loading={actionLoading[`view_${record._id}`]}
            onClick={() => fetchUserById(record._id)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />}
              loading={actionLoading[`delete_${record._id}`]}
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const activeUsers = users.filter(u => u.isActive !== false).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  return (
    <DashboardHome>
      <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            User Management
          </h1>
          <p style={{ color: '#666' }}>Manage platform users, roles, and permissions</p>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Users"
                value={users.length}
                prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Users"
                value={activeUsers}
                prefix={<UserOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Admins"
                value={adminUsers}
                prefix={<PoweroffOutlined style={{ color: '#722ed1' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Search
                placeholder="Search users..."
                allowClear
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={12} md={4}>
              <Select
                style={{ width: '100%' }}
                value={filters.status}
                onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <Option value="all">All Status</Option>
                <Option value="true">Active</Option>
                <Option value="false">Inactive</Option>
              </Select>
            </Col>
            <Col xs={12} md={4}>
              <Select
                style={{ width: '100%' }}
                value={filters.role}
                onChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
              >
                <Option value="all">All Roles</Option>
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Space>
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={exportUsers}
                >
                  Export
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={handleCreateUser}
                >
                  Add User
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
            scroll={{ x: 800 }}
            locale={{
              emptyText: 'No users found. Try adjusting your search or filters.'
            }}
          />
        </Card>

        <Modal
          title={editingUser ? 'Edit User' : 'Create New User'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={saveUser}
            initialValues={{
              role: 'user',
              isActive: true
            }}
          >
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter full name' }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select>
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isActive"
                  label="Status"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title="User Details"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={400}
        >
          {viewingUser && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Avatar 
                  size={80} 
                  style={{ backgroundColor: '#f56a00' }}
                  icon={<UserOutlined />}
                >
                  {(viewingUser.fullName || viewingUser.username || 'U').charAt(0).toUpperCase()}
                </Avatar>
                <h3 style={{ marginTop: '16px', marginBottom: '8px' }}>
                  {viewingUser.fullName || viewingUser.username}
                </h3>
                <p style={{ color: '#666', marginBottom: '16px' }}>
                  @{viewingUser.username}
                </p>
                <Space>
                  <Tag color={viewingUser.role === 'admin' ? 'purple' : 'pink'}>
                    {viewingUser.role?.toUpperCase()}
                  </Tag>
                  <Tag color={viewingUser.isActive !== false ? 'green' : 'red'}>
                    {viewingUser.isActive !== false ? 'Active' : 'Inactive'}
                  </Tag>
                </Space>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <PhoneOutlined style={{ marginRight: '8px', color: '#666' }} />
                  <span style={{ color: '#666' }}>Phone</span>
                </div>
                <p>{viewingUser.phone || 'N/A'}</p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <CalendarOutlined style={{ marginRight: '8px', color: '#666' }} />
                  <span style={{ color: '#666' }}>Created</span>
                </div>
                <p>{new Date(viewingUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </DashboardHome>
  );
};

export default UserManagementDashboard;