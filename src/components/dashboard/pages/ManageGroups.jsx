import React, { useState, useEffect } from "react";
import DashboardHome from "../DashboardLayout";

import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  Space,
  Tag,
  Tooltip,
  Popconfirm,
  message,
  Row,
  Col,
  Statistic,
  Avatar,
  Typography,
  Tabs,
  Badge,
  Dropdown,
  Menu,
  Spin,
  Empty,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TeamOutlined,
  SettingOutlined,
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  MoreOutlined,
  GroupOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import {
  fetchAsynServices,
  getAllServices,
  getIsLoadingServices,
  getUser,
} from "../../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

const ManageGroups = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  // Get services from Redux
  const servicesList = useSelector(getAllServices);
  const isLoadingServices = useSelector(getIsLoadingServices);
  console.log(servicesList)

  const [selectedService, setSelectedService] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const [pendingGroups, setPendingGroups] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_private: false,
    group_icon: null,
  });

  // Fetch groups when component mounts or when selectedService changes
  useEffect(() => {
    fetchGroups();
    dispatch(
      fetchAsynServices({
        currentPage: 1,
        searchQuery: "",
        categoryId: "",
        groupId: "",
      })
    );
  }, [dispatch]);

  const fetchGroups = async (serviceId = null) => {
    setLoading(true);
    try {
      // If serviceId is provided, fetch groups for that specific service
      const url = serviceId
        ? `${API_BASE}/groups/service/${serviceId}`
        : `${API_BASE}/groups`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch groups");
      const data = await response.json();

      // Handle different response structures
      const groupsData = data.groups || data || [];

      console.log("");
      setGroups(groupsData);

      console.log("Fetched groups:", groupsData); // Debug log
    } catch (error) {
      console.error("Error fetching groups:", error);
      message.error("Failed to fetch groups");
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinRequests = async (serviceId) => {
    setRequestsLoading(true);
    try {
      // Fetch join requests for all groups in the service
      const groupsResponse = await fetch(
        `${API_BASE}/groups/service/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!groupsResponse.ok) throw new Error("Failed to fetch groups");
      const groupsData = await groupsResponse.json();
      const groups = groupsData.groups || groupsData || [];

      let allRequests = [];
      for (const group of groups) {
        try {
          const requestsResponse = await fetch(
            `${API_BASE}/groups/${group._id}/requests`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (requestsResponse.ok) {
            const requestsData = await requestsResponse.json();
            const requests = requestsData.requests || requestsData || [];
            allRequests = [
              ...allRequests,
              ...requests.map((req) => ({
                ...req,
                groupName: group.name,
                groupId: group._id,
              })),
            ];
          }
        } catch (error) {
          console.error(
            `Error fetching requests for group ${group.name}:`,
            error
          );
        }
      }
      setJoinRequests(allRequests);
    } catch (error) {
      console.error("Error fetching join requests:", error);
      message.error("Failed to fetch join requests");
    } finally {
      setRequestsLoading(false);
    }
  };

  const handleCreateGroup = async (values) => {
    if (!values.name || !values.description) {
      message.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("service_id", selectedService.id);
      formData.append("is_private", values.is_private ? "true" : "false");

      if (values.group_icon) {
        formData.append("group_icon", values.group_icon);
      }

      const response = await fetch(`${API_BASE}/groups`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create group");
      const data = await response.json();

      message.success("Group created successfully");
      setModalVisible(false);
      setFormData({
        name: "",
        description: "",
        is_private: false,
        group_icon: null,
      });
      fetchGroups(selectedService.id);
    } catch (error) {
      console.error("Error creating group:", error);
      message.error("Failed to create group");
    }
  };

  const handleUpdateGroup = async (values) => {
    if (!values.name || !values.description) {
      message.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("is_private", values.is_private ? "true" : "false");

      if (values.group_icon) {
        formData.append("group_icon", values.group_icon);
      }

      const response = await fetch(`${API_BASE}/groups/${editingGroup._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update group");
      const data = await response.json();

      message.success("Group updated successfully");
      setModalVisible(false);
      setEditingGroup(null);
      setFormData({
        name: "",
        description: "",
        is_private: false,
        group_icon: null,
      });
      fetchGroups(selectedService.id);
    } catch (error) {
      console.error("Error updating group:", error);
      message.error("Failed to update group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete group");

      message.success("Group deleted successfully");
      fetchGroups(selectedService.id);
    } catch (error) {
      console.error("Error deleting group:", error);
      message.error("Failed to delete group");
    }
  };

  const handleApproveGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to approve group");

      message.success("Group approved successfully");
      fetchGroups(selectedService.id);
    } catch (error) {
      console.error("Error approving group:", error);
      message.error("Failed to approve group");
    }
  };

  const handleJoinRequest = async (groupId, userId, action) => {
    try {
      const response = await fetch(
        `${API_BASE}/groups/${groupId}/${action}/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to ${action} join request`);

      message.success(`Join request ${action}d successfully`);
      fetchJoinRequests(selectedService.id);
    } catch (error) {
      console.error(`Error ${action}ing join request:`, error);
      message.error(`Failed to ${action} join request`);
    }
  };

  const groupColumns = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          {/* <Avatar src={record.group_icon} icon={<GroupOutlined />} /> */}
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => {
        const statusText = isActive ? "Active" : "Inactive";
        const color = isActive ? "green" : "red";
        return <Tag color={color}>{statusText.toUpperCase()}</Tag>;
      },
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
              <Menu.Item key="view" icon={<EyeOutlined />}>
                View Details
              </Menu.Item>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingGroup(record);
                  setFormData({
                    name: record.name,
                    description: record.description,
                    is_private: record.is_private,
                    group_icon: record.group_icon,
                  });
                  setModalVisible(true);
                }}
              >
                Edit
              </Menu.Item>
              {!record.is_active && (
                <Menu.Item
                  key="approve"
                  icon={<CheckOutlined />}
                  onClick={() => handleApproveGroup(record._id)}
                >
                  Approve
                </Menu.Item>
              )}
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

  const requestColumns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div>
          <Text strong>{user?.name || user?.username || "Unknown User"}</Text>
          <br />
          <Text type="secondary">{user?.email || "No email"}</Text>
        </div>
      ),
    },
    {
      title: "Group",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "pending"
              ? "orange"
              : "red"
          }
        >
          {status?.toUpperCase() || "PENDING"}
        </Tag>
      ),
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            size="small"
            onClick={() =>
              handleJoinRequest(record.groupId, record.user._id, "approve")
            }
            disabled={record.status === "approved"}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            size="small"
            onClick={() =>
              handleJoinRequest(record.groupId, record.user._id, "reject")
            }
            disabled={record.status === "rejected"}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleServiceChange = (value) => {
    const service = servicesList.find((s) => s.id === value);
    setSelectedService(service);
    // Clear existing groups when changing service
    setGroups([]);
    setJoinRequests([]);
  };

  return (
    <DashboardHome>
      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Title level={2}>
            <GroupOutlined /> Manage Service Groups
          </Title>
          <Text type="secondary">
            Create and manage groups for your services
          </Text>
        </div>

        <Card style={{ marginBottom: "24px" }}>
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Select Service:</Text>
              <Select
                style={{ width: "100%", marginTop: "8px" }}
                placeholder="Choose a service to manage groups"
                loading={isLoadingServices}
                onChange={handleServiceChange}
                value={selectedService?.id}
              >
                {servicesList.map((service) => (
                  <Option key={service.id} value={service.id}>
                    <Space>
                      <Avatar
                      src={service.icon}
                      icon={<SafetyOutlined />}
                      size="small"
                    />
                      {service.title}
                      <Badge count={service.total_groups} />
                    </Space>
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={12}>
              {selectedService && (
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setEditingGroup(null);
                      setFormData({
                        name: "",
                        description: "",
                        is_private: false,
                        group_icon: null,
                      });
                      setModalVisible(true);
                    }}
                  >
                    Create New Group
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Card>

        <Card>
          <div style={{ marginBottom: "16px" }}>
            <Space>
              {/* <Avatar src={selectedService.icon} /> */}
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {/* {selectedService.name} */}
                </Title>
                {/* <Text type="secondary">{selectedService.description}</Text> */}
              </div>
            </Space>
          </div>

          <Tabs defaultActiveKey="groups">
            <TabPane tab={`Groups (${groups.length})`} key="groups">
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
            </TabPane>
            <TabPane
              tab={`Join Requests (${joinRequests.length})`}
              key="requests"
            >
              <Table
                columns={requestColumns}
                dataSource={joinRequests}
                loading={requestsLoading}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>
          </Tabs>
        </Card>

        {!selectedService && (
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Please select a service to manage its groups"
            />
          </Card>
        )}

        <Modal
          title={editingGroup ? "Edit Group" : "Create New Group"}
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingGroup(null);
            setFormData({
              name: "",
              description: "",
              is_private: false,
              group_icon: null,
            });
          }}
          footer={null}
          width={600}
        >
          <div onSubmit={editingGroup ? handleUpdateGroup : handleCreateGroup}>
            <div style={{ marginBottom: "16px" }}>
              <Text strong>Group Name *</Text>
              <Input
                placeholder="Enter group name"
                style={{ marginTop: "4px" }}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Description *</Text>
              <Input.TextArea
                rows={3}
                placeholder="Enter group description"
                style={{ marginTop: "4px" }}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Privacy Settings</Text>
              <div style={{ marginTop: "4px" }}>
                <Switch
                  checkedChildren="Private"
                  unCheckedChildren="Public"
                  checked={formData.is_private}
                  onChange={(checked) =>
                    setFormData({ ...formData, is_private: checked })
                  }
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
                onChange={(info) =>
                  setFormData({ ...formData, group_icon: info.file })
                }
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
                  onClick={() => {
                    if (editingGroup) {
                      handleUpdateGroup(formData);
                    } else {
                      handleCreateGroup(formData);
                    }
                  }}
                >
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
