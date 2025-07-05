import React, { useState, useEffect } from "react";
import DashboardHome from "../DashboardLayout";
import {
  Card, Table, Button, Modal, Input, Select, Switch, Upload, Space, Tag, 
  Popconfirm, message, Row, Col, Avatar, Typography, Tabs, Badge, Dropdown, Menu, Empty
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, TeamOutlined, 
  CheckOutlined, CloseOutlined, UploadOutlined, MoreOutlined, GroupOutlined, SafetyOutlined
} from "@ant-design/icons";
import { fetchAsynServices, getAllServices, getIsLoadingServices, getUser } from "../../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

const ManageGroups = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  const servicesList = useSelector(getAllServices);
  const isLoadingServices = useSelector(getIsLoadingServices);

  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState(null);
  const [formData, setFormData] = useState({
    name: "", description: "", is_private: false, group_icon: null, service_id: "", group_link: ""
  });

  useEffect(() => {
    fetchAllGroups();
    dispatch(fetchAsynServices({ currentPage: 1, searchQuery: "", categoryId: "", groupId: "" }));
  }, [dispatch]);

  const fetchAllGroups = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/groups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch groups");
      const data = await response.json();
      const groupsData = data.groups || data || [];
      setAllGroups(groupsData);
      setGroups(groupsData);
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const filterGroupsByService = (serviceId) => {
    setSelectedServiceFilter(serviceId);
    if (!serviceId) {
      setGroups(allGroups);
    } else {
      const filtered = allGroups.filter(group => group.service_id === serviceId);
      setGroups(filtered);
    }
  };

  const handleSubmitGroup = async () => {
    if (!formData.name || !formData.description || !formData.service_id) {
      message.error("Please fill in all required fields");
      return;
    }

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'group_icon' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key === 'is_private') {
          submitData.append(key, formData[key] ? "true" : "false");
        } else if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      const url = editingGroup ? `${API_BASE}/groups/${editingGroup._id}` : `${API_BASE}/groups`;
      const method = editingGroup ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: submitData
      });

      if (!response.ok) throw new Error(`Failed to ${editingGroup ? 'update' : 'create'} group`);
      
      message.success(`Group ${editingGroup ? 'updated' : 'created'} successfully`);
      setModalVisible(false);
      resetForm();
      fetchAllGroups();
    } catch (error) {
      console.error(`Error ${editingGroup ? 'updating' : 'creating'} group:`, error);
      message.error(`Failed to ${editingGroup ? 'update' : 'create'} group`);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to delete group");
      message.success("Group deleted successfully");
      fetchAllGroups();
    } catch (error) {
      console.error("Error deleting group:", error);
      message.error("Failed to delete group");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", is_private: false, group_icon: null, service_id: "", group_link: "" });
    setEditingGroup(null);
  };

  const openEditModal = (record) => {
    setEditingGroup(record);
    setFormData({
      name: record.name,
      description: record.description,
      is_private: record.is_private,
      group_icon: record.group_icon,
      service_id: record.service_id,
      group_link: record.group_link || ""
    });
    setModalVisible(true);
  };

  const groupColumns = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>{record.description}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Service",
      dataIndex: "service_id",
      key: "service_id",
      render: (serviceId) => {
        const service = servicesList.find(s => s.id === serviceId);
        return service ? (
          <Space>
            <Avatar src={service.icon} icon={<SafetyOutlined />} size="small" />
            {service.title}
          </Space>
        ) : "Unknown Service";
      },
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Privacy",
      dataIndex: "is_private",
      key: "is_private",
      render: (isPrivate) => (
        <Tag color={isPrivate ? "blue" : "green"}>
          {isPrivate ? "Private" : "Public"}
        </Tag>
      ),
    },
    {
      title: "Members",
      dataIndex: "members_count",
      key: "members_count",
      render: (members) => (
        <Space>
          <TeamOutlined />
          <Text>{members || 0}</Text>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => openEditModal(record)}>
                Edit
              </Menu.Item>
              <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                <Popconfirm
                  title="Are you sure you want to delete this group?"
                  onConfirm={() => handleDeleteGroup(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  Delete
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <DashboardHome>
      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Title level={2}><GroupOutlined /> Manage Groups</Title>
          <Text type="secondary">Admin panel for managing all service groups</Text>
        </div>

        <Card style={{ marginBottom: "24px" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Filter by Service:</Text>
              <Select
                style={{ width: "100%", marginTop: "8px" }}
                placeholder="All Services"
                allowClear
                loading={isLoadingServices}
                onChange={filterGroupsByService}
                value={selectedServiceFilter}
              >
                {servicesList.map((service) => (
                  <Option key={service.id} value={service.id}>
                    <Space>
                      <Avatar src={service.icon} icon={<SafetyOutlined />} size="small" />
                      {service.title}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              <div style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    resetForm();
                    setModalVisible(true);
                  }}
                >
                  Create New Group
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        <Card>
          <Table
            columns={groupColumns}
            dataSource={groups}
            loading={loading}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} groups`,
            }}
          />
        </Card>

        <Modal
          title={editingGroup ? "Edit Group" : "Create New Group"}
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            resetForm();
          }}
          footer={null}
          width={600}
        >
          <div>
            <div style={{ marginBottom: "16px" }}>
              <Text strong>Service *</Text>
              <Select
                style={{ width: "100%", marginTop: "4px" }}
                placeholder="Select service"
                value={formData.service_id}
                onChange={(value) => setFormData({ ...formData, service_id: value })}
              >
                {servicesList.map((service) => (
                  <Option key={service.id} value={service.id}>
                    <Space>
                      <Avatar src={service.icon} icon={<SafetyOutlined />} size="small" />
                      {service.title}
                    </Space>
                  </Option>
                ))}
              </Select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Group Name *</Text>
              <Input
                placeholder="Enter group name"
                style={{ marginTop: "4px" }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Description *</Text>
              <Input.TextArea
                rows={3}
                placeholder="Enter group description"
                style={{ marginTop: "4px" }}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Group Link</Text>
              <Input
                placeholder="Enter group link (optional)"
                style={{ marginTop: "4px" }}
                value={formData.group_link}
                onChange={(e) => setFormData({ ...formData, group_link: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Privacy Settings</Text>
              <div style={{ marginTop: "4px" }}>
                <Switch
                  checkedChildren="Private"
                  unCheckedChildren="Public"
                  checked={formData.is_private}
                  onChange={(checked) => setFormData({ ...formData, is_private: checked })}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Group Icon</Text>
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                accept="image/*"
                style={{ marginTop: "4px" }}
                onChange={(info) => setFormData({ ...formData, group_icon: info.file })}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </div>

            <div>
              <Space>
                <Button type="primary" onClick={handleSubmitGroup}>
                  {editingGroup ? "Update Group" : "Create Group"}
                </Button>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              </Space>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardHome>
  );
};

export default ManageGroups;