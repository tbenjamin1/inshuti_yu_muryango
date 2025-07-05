import React, { useState, useEffect } from "react";
import DashboardHome from "../DashboardLayout";
import {
  Card, Table, Button, Modal, Input, Select, Switch, Upload, Space, Tag, 
  Popconfirm, message, Row, Col, Avatar, Typography, Badge, Dropdown, Menu, 
  Empty, Descriptions, List, Divider, Tabs
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, TeamOutlined, 
  CheckOutlined, CloseOutlined, UploadOutlined, MoreOutlined, GroupOutlined, 
  SafetyOutlined, UserOutlined, CalendarOutlined, CrownOutlined
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
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [viewingGroup, setViewingGroup] = useState(null);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState(null);
  const [approvingUser, setApprovingUser] = useState(null);
  const [rejectingUser, setRejectingUser] = useState(null);
  const [approvingGroup, setApprovingGroup] = useState(false);
  const [rejectingGroup, setRejectingGroup] = useState(false);
  const [submittingGroup, setSubmittingGroup] = useState(false); // Add this state
  const [joinRequests, setJoinRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsFilter, setRequestsFilter] = useState('pending');
  const [formData, setFormData] = useState({
    name: "", description: "", is_private: false, group_icon: null, service_id: "", link: ""
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
      const filtered = allGroups.filter(group => 
        group.service_id && (group.service_id._id === serviceId || group.service_id.id === serviceId)
      );
      setGroups(filtered);
    }
  };

  const fetchGroupRequests = async (groupId, status = 'pending') => {
    setRequestsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/requests?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();
      setJoinRequests(data.requests || data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      message.error("Failed to fetch join requests");
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleApproveGroup = async (groupId) => {
    setApprovingGroup(true);
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/approve`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) throw new Error("Failed to approve group");
      
      message.success("Group approved successfully");
      
      // Refresh data
      await fetchAllGroups();
      
      // Update viewing group if it's the same group
      if (viewingGroup && viewingGroup._id === groupId) {
        const updatedGroup = allGroups.find(g => g._id === groupId);
        if (updatedGroup) {
          setViewingGroup({ ...updatedGroup, approval_status: 'approved' });
        }
      }
    } catch (error) {
      console.error("Error approving group:", error);
      message.error("Failed to approve group");
    } finally {
      setApprovingGroup(false);
    }
  };

  const handleRejectGroup = async (groupId) => {
    setRejectingGroup(true);
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/reject`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) throw new Error("Failed to reject group");
      
      message.success("Group rejected successfully");
      
      // Refresh data
      await fetchAllGroups();
      
      // Update viewing group if it's the same group
      if (viewingGroup && viewingGroup._id === groupId) {
        const updatedGroup = allGroups.find(g => g._id === groupId);
        if (updatedGroup) {
          setViewingGroup({ ...updatedGroup, approval_status: 'rejected' });
        }
      }
    } catch (error) {
      console.error("Error rejecting group:", error);
      message.error("Failed to reject group");
    } finally {
      setRejectingGroup(false);
    }
  };

  const handleRejectUser = async (groupId, userId) => {
    setRejectingUser(userId);
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/reject/${userId}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) throw new Error("Failed to reject user");
      
      message.success("User rejected successfully");
      
      // Refresh data
      await fetchAllGroups();
      if (viewingGroup) {
        await fetchGroupRequests(groupId, requestsFilter);
        const updatedGroups = allGroups.map(g => 
          g._id === groupId ? { ...g, joined_users: g.joined_users.filter(u => u.user_id !== userId) } : g
        );
        setAllGroups(updatedGroups);
        setGroups(updatedGroups);
        const updatedViewingGroup = updatedGroups.find(g => g._id === groupId);
        if (updatedViewingGroup) setViewingGroup(updatedViewingGroup);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      message.error("Failed to reject user");
    } finally {
      setRejectingUser(null);
    }
  };

  const handleApproveUser = async (groupId, userId) => {
    setApprovingUser(userId);
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/approve/${userId}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) throw new Error("Failed to approve user");
      
      message.success("User approved successfully");
      
      // Refresh data
      await fetchAllGroups();
      if (viewingGroup) {
        await fetchGroupRequests(groupId, requestsFilter);
        const updatedGroups = await fetch(`${API_BASE}/groups`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updatedData = await updatedGroups.json();
        const updatedGroupsData = updatedData.groups || updatedData || [];
        setAllGroups(updatedGroupsData);
        setGroups(updatedGroupsData);
        const updatedViewingGroup = updatedGroupsData.find(g => g._id === groupId);
        if (updatedViewingGroup) setViewingGroup(updatedViewingGroup);
      }
    } catch (error) {
      console.error("Error approving user:", error);
      message.error("Failed to approve user");
    } finally {
      setApprovingUser(null);
    }
  };

  const handleSubmitGroup = async () => {
    if (!formData.name || !formData.description || !formData.service_id) {
      message.error("Please fill in all required fields");
      return;
    }

    setSubmittingGroup(true); // Set loading state
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
    } finally {
      setSubmittingGroup(false); // Reset loading state
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
    setFormData({ name: "", description: "", is_private: false, group_icon: null, service_id: "", link: "" });
    setEditingGroup(null);
  };

  const openEditModal = (record) => {
    setEditingGroup(record);
    setFormData({
      name: record.name,
      description: record.description,
      is_private: record.is_private,
      group_icon: record.group_icon,
      service_id: record.service_id?._id || record.service_id?.id || record.service_id,
      link: record.link || ""
    });
    setModalVisible(true);
  };

  const openViewModal = (record) => {
    setViewingGroup(record);
    setViewModalVisible(true);
    fetchGroupRequests(record._id, 'pending');
  };

  const groupColumns = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar 
            src={record.group_icon !== 'default-group-icon-url' ? record.group_icon : null} 
            icon={<GroupOutlined />} 
          />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description?.length > 50 ? `${record.description.substring(0, 50)}...` : record.description}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Service",
      dataIndex: "service_id",
      key: "service_id",
      render: (service) => {
        if (!service) return <Text type="secondary">No Service</Text>;
        return (
          <Space>
            <Avatar icon={<SafetyOutlined />} size="small" />
            <div>
              <Text strong>{service.title}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {service.subtitle?.substring(0, 30)}...
              </Text>
            </div>
          </Space>
        );
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
      title: "Approval",
      dataIndex: "approval_status",
      key: "approval_status",
      render: (status) => (
        <Tag color={status === "approved" ? "green" : status === "pending" ? "orange" : "red"}>
          {status?.toUpperCase() || "PENDING"}
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
      render: (count, record) => (
        <Space>
          <TeamOutlined />
          <Text>{count || 0}</Text>
          <Text type="secondary">({record.formatted_members || "0 members"})</Text>
        </Space>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => openViewModal(record)}>
                View Details
              </Menu.Item>
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

  const renderMembersTab = () => (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Title level={5}>Group Members ({viewingGroup?.members_count || 0})</Title>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Select
                value={requestsFilter}
                onChange={(value) => {
                  setRequestsFilter(value);
                  fetchGroupRequests(viewingGroup._id, value);
                }}
                style={{ width: 150 }}
              >
                <Option value="pending">Pending</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </div>
          </Col>
        </Row>
      </div>
      
      <Table
        dataSource={requestsFilter === 'approved' ? viewingGroup?.joined_users?.filter(u => u.status === 'approved') : joinRequests}
        rowKey="_id"
        loading={requestsLoading}
        pagination={{ pageSize: 10 }}
        columns={[
          {
            title: "User",
            dataIndex: "user_id",
            key: "user_id",
            render: (userId, record) => (
              <Space>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <Text>User ID: {userId}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    {record.user_info?.email || record.user_info?.username || 'No additional info'}
                  </Text>
                </div>
              </Space>
            ),
          },
          {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => (
              <Tag color="blue">{role || 'member'}</Tag>
            ),
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
              <Tag color={status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange'}>
                {status}
              </Tag>
            ),
          },
          {
            title: "Joined",
            dataIndex: "joined_at",
            key: "joined_at",
            render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Space>
                {record.status === 'pending' && (
                  <>
                    <Button
                      type="primary"
                      size="small"
                      icon={<CheckOutlined />}
                      loading={approvingUser === record.user_id}
                      onClick={() => handleApproveUser(viewingGroup._id, record.user_id)}
                    >
                      Approve
                    </Button>
                    <Button
                      danger
                      size="small"
                      icon={<CloseOutlined />}
                      loading={rejectingUser === record.user_id}
                      onClick={() => handleRejectUser(viewingGroup._id, record.user_id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {record.status === 'approved' && (
                  <Button
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    loading={rejectingUser === record.user_id}
                    onClick={() => handleRejectUser(viewingGroup._id, record.user_id)}
                  >
                    Remove
                  </Button>
                )}
              </Space>
            ),
          },
        ]}
      />
    </div>
  );

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
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Create/Edit Group Modal */}
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
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
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
                <Button 
                  type="primary" 
                  onClick={handleSubmitGroup}
                  loading={submittingGroup}
                  disabled={submittingGroup}
                >
                  {editingGroup ? "Update Group" : "Create Group"}
                </Button>
                <Button 
                  onClick={() => setModalVisible(false)}
                  disabled={submittingGroup}
                >
                  Cancel
                </Button>
              </Space>
            </div>
          </div>
        </Modal>

        {/* View Group Details Modal */}
        <Modal
          title="Group Details"
          visible={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Close
            </Button>
          ]}
          width={1000}
        >
          {viewingGroup && (
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <Row gutter={16}>
                  <Col span={8}>
                    <Card style={{ textAlign: "center" }}>
                      <Avatar 
                        size={100} 
                        src={viewingGroup.group_icon !== 'default-group-icon-url' ? viewingGroup.group_icon : null}
                        icon={<GroupOutlined />} 
                      />
                      <Title level={4} style={{ marginTop: "16px" }}>{viewingGroup.name}</Title>
                      <Text type="secondary">{viewingGroup.description}</Text>
                      
                      {/* Group Approval/Rejection Buttons */}
                      <div style={{ marginTop: "16px" }}>
                        {viewingGroup.approval_status === 'pending' && (
                          <Space>
                            <Button
                              type="primary"
                              icon={<CheckOutlined />}
                              loading={approvingGroup}
                              onClick={() => handleApproveGroup(viewingGroup._id)}
                            >
                              Approve Group
                            </Button>
                            <Button
                              danger
                              icon={<CloseOutlined />}
                              loading={rejectingGroup}
                              onClick={() => handleRejectGroup(viewingGroup._id)}
                            >
                              Reject Group
                            </Button>
                          </Space>
                        )}
                        {viewingGroup.approval_status === 'approved' && (
                          <Tag color="green" style={{ marginTop: "8px" }}>
                            <CheckOutlined /> Group Approved
                          </Tag>
                        )}
                        {viewingGroup.approval_status === 'rejected' && (
                          <Tag color="red" style={{ marginTop: "8px" }}>
                            <CloseOutlined /> Group Rejected
                          </Tag>
                        )}
                      </div>
                    </Card>
                  </Col>
                  <Col span={16}>
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="Service">
                        <Space>
                          <Avatar icon={<SafetyOutlined />} size="small" />
                          {viewingGroup.service_id?.title || "No Service"}
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label="Status">
                        <Tag color={viewingGroup.is_active ? "green" : "red"}>
                          {viewingGroup.is_active ? "ACTIVE" : "INACTIVE"}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Approval Status">
                        <Tag color={viewingGroup.approval_status === "approved" ? "green" : viewingGroup.approval_status === "rejected" ? "red" : "orange"}>
                          {viewingGroup.approval_status?.toUpperCase() || "PENDING"}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Privacy">
                        <Tag color={viewingGroup.is_private ? "blue" : "green"}>
                          {viewingGroup.is_private ? "Private" : "Public"}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Members">
                        <Space>
                          <TeamOutlined />
                          <Text>{viewingGroup.members_count || 0} members</Text>
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label="Created">
                        <Space>
                          <CalendarOutlined />
                          {new Date(viewingGroup.createdAt).toLocaleDateString()}
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label="Group Admin">
                        <Space>
                          <CrownOutlined />
                          <Text>{viewingGroup.group_admin?.fullName || viewingGroup.group_admin?.username || "Unknown"}</Text>
                        </Space>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={`Members (${viewingGroup.members_count || 0})`} key="2">
                {renderMembersTab()}
              </TabPane>
              <TabPane tab={`Join Requests (${joinRequests.length})`} key="3">
                {renderMembersTab()}
              </TabPane>
            </Tabs>
          )}
        </Modal>
      </div>
    </DashboardHome>
  );
};

export default ManageGroups