import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Spin, Empty, Tag, Avatar, Divider, Typography, Space, Row, Col, Tooltip } from 'antd';
import {
  Heart, Users, Shield, Sparkles, MessageCircle, Hash, Send, Facebook, Phone, Slack,
  ExternalLink, Calendar, UserCheck, Lock, Globe, Loader2, Eye
} from "lucide-react";
import NewNavBar from "../auth/NewNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchAsynGroups, fetchAsynServices, getAllGroups, getAllServices,
  getIsLoadingGroups, getIsLoadingServices, getUser,
} from "../../redux/transactions/TransactionSlice";

const { Title, Text, Paragraph } = Typography;
const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api";

const SupportGroupsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('slug');
  
  const user = useSelector(getUser);
  const token = user?.token;
  const groupsList = useSelector(getAllGroups);
  const isLoadingGroups = useSelector(getIsLoadingGroups);
  const servicesList = useSelector(getAllServices);
  const isLoadingServices = useSelector(getIsLoadingServices);
  const currentService = servicesList?.find(service => service.id === serviceId);

  const [joiningGroups, setJoiningGroups] = useState(new Set());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(fetchAsynServices({ currentPage: 1, searchQuery: "", categoryId: "" }));
      if (serviceId) {
        dispatch(fetchAsynGroups({ currentPage: 1, searchQuery: "", categoryId: "", serviceId }));
      }
    }
  }, [token, dispatch, serviceId]);

  const testimonials = [
    { name: "Sarah M.", text: "Finding this community changed my life. I finally felt understood and supported.", platform: "Support Group Member" },
    { name: "Maria K.", text: "The support here is incredible. Whether it's day or night, there's always someone who understands.", platform: "Community Member" },
    { name: "Jennifer L.", text: "I've gained not just support, but lifelong friendships. We've helped each other through so much.", platform: "Active Participant" },
  ];

  const getGroupIcon = (group) => {
    const iconMap = { 'whatsapp': Phone, 'discord': Hash, 'telegram': Send, 'facebook': Facebook, 'slack': Slack, 'default': MessageCircle };
    const groupName = group.name.toLowerCase();
    return Object.keys(iconMap).find(key => groupName.includes(key)) ? iconMap[Object.keys(iconMap).find(key => groupName.includes(key))] : iconMap.default;
  };

  const getGroupColor = (index) => {
    const colors = ["#52c41a", "#1890ff", "#722ed1", "#eb2f96", "#fa541c", "#13c2c2"];
    return colors[index % colors.length];
  };

  const joinGroup = async (groupId) => {
    if (!token) {
      Modal.error({ title: 'Error', content: 'Please log in to join a group' });
      return;
    }
    
    setJoiningGroups(prev => new Set(prev).add(groupId));
    
    try {
      const response = await fetch(`${API_BASE}/groups/${groupId}/join`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const joinData = await response.json();
        Modal.success({ title: 'Success', content: 'Successfully joined the group!' });
        
        dispatch(fetchAsynGroups({ currentPage: 1, searchQuery: "", categoryId: "", serviceId: serviceId || "" }));
        
        if (joinData?.redirect_link) {
          window.location.href = joinData.redirect_link;
        }
      } else {
        const errorData = await response.json();
        Modal.error({ title: 'Error', content: `Failed to join group: ${errorData.message || 'Unknown error'}` });
      }
    } catch (error) {
      Modal.error({ title: 'Error', content: 'Failed to join group. Please try again.' });
    } finally {
      setJoiningGroups(prev => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  const showGroupDetails = (group) => {
    setSelectedGroup(group);
    setDetailsVisible(true);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoadingGroups || isLoadingServices) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Spin size="large" />
        <Text className="text-white text-lg ml-4">Loading support groups...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NewNavBar />
      
      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center px-6 pt-28 pb-12">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <Title level={1} className="text-white mb-6">
            {currentService?.title || "Support Groups"}
          </Title>
          <Paragraph className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {currentService?.subtitle || "Join a supportive community where understanding, encouragement, and strength come from people who share your journey"}
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              onClick={() => scrollToSection("groups")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 border-none"
            >
              Browse Groups ({groupsList?.length || 0})
            </Button>
            <Button
              size="large"
              onClick={() => scrollToSection("testimonials")}
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
            >
              Read Stories
            </Button>
          </Space>
        </div>
      </section>

      {/* Why Support Groups Matter */}
      <section id="why" className="">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <Title level={2} className="text-white mb-6">Why Support Groups Matter</Title>
            <Text className="text-xl text-white/80 max-w-2xl mx-auto">
              Connect with others who understand your journey. Find support, share experiences, and grow together.
            </Text>
          </div>
          <Row gutter={[32, 32]}>
            {[
              { icon: Heart, title: "Understanding & Empathy", description: "Connect with people who truly understand your experiences.", color: "#eb2f96" },
              { icon: Shield, title: "Safe Space", description: "Share your thoughts in a judgment-free environment.", color: "#1890ff" },
              { icon: Sparkles, title: "Strength & Growth", description: "Discover your inner strength and grow alongside others.", color: "#52c41a" },
            ].map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  className="backdrop-blur-md bg-white/10 border-white/20 text-center hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: feature.color }}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Title level={3} className="text-white mb-4">{feature.title}</Title>
                  <Text className="text-white/80">{feature.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Support Groups */}
      <section id="groups" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-white mb-6">Available Support Groups</Title>
            <Text className="text-xl text-white/80 max-w-2xl mx-auto">
              Join one of our active support groups and connect with others who share similar experiences.
            </Text>
          </div>

          {groupsList && groupsList.length > 0 ? (
            <Row gutter={[24, 24]}>
              {groupsList.map((group, index) => {
                const IconComponent = getGroupIcon(group);
                const color = getGroupColor(index);
                const isJoining = joiningGroups.has(group.id);
                
                return (
                  <Col xs={24} md={12} lg={8} key={group.id}>
                    <Card
                      className="h-full hover:shadow-lg transition-all duration-300"
                      actions={[
                        <Button
                          key="join"
                          type="primary"
                          loading={isJoining}
                          onClick={() => joinGroup(group.id)}
                          style={{ backgroundColor: color, borderColor: color }}
                          icon={<UserCheck className="w-4 h-4" />}
                        >
                          Join Group
                        </Button>,
                        <Button
                          key="view"
                          type="default"
                          onClick={() => showGroupDetails(group)}
                          icon={<Eye className="w-4 h-4" />}
                        >
                          View Details
                        </Button>,
                        group.link && (
                          <Tooltip title="External Link">
                            <Button
                              key="link"
                              type="link"
                              href={group.link}
                              target="_blank"
                              icon={<ExternalLink className="w-4 h-4" />}
                            />
                          </Tooltip>
                        )
                      ].filter(Boolean)}
                    >
                      <Card.Meta
                        avatar={
                          <Avatar
                            style={{ backgroundColor: color }}
                            icon={<IconComponent className="w-4 h-4" />}
                          />
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <span className="truncate">{group.name}</span>
                            <Tag color={group.is_private ? 'red' : 'green'}>
                              {group.is_private ? <Lock className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <Paragraph ellipsis={{ rows: 2 }} className="mb-2">
                              {group.description}
                            </Paragraph>
                            <Space split={<Divider type="vertical" />}>
                              <span><Users className="w-4 h-4 inline mr-1" />{group.formatted_members}</span>
                              <span><Calendar className="w-4 h-4 inline mr-1" />{new Date(group.createdAt).toLocaleDateString()}</span>
                            </Space>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Empty
              description="No support groups available for this service"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-white mb-6">Stories from Our Community</Title>
            <Text className="text-xl text-white/80 max-w-2xl mx-auto">
              Hear from members who found strength and support in our groups.
            </Text>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-md bg-white/95 text-center mb-8">
              <Avatar
                size={64}
                style={{ backgroundColor: '#eb2f96', marginBottom: 16 }}
              >
                {testimonials[activeTestimonial].name.charAt(0)}
              </Avatar>
              <Paragraph className="text-lg italic mb-4">
                "{testimonials[activeTestimonial].text}"
              </Paragraph>
              <Title level={4}>{testimonials[activeTestimonial].name}</Title>
              <Text type="secondary">{testimonials[activeTestimonial].platform}</Text>
            </Card>
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  type={index === activeTestimonial ? "primary" : "default"}
                  shape="circle"
                  size="small"
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Card className="backdrop-blur-md bg-white/10 border-white/20 text-center">
              <Users className="w-16 h-16 text-white mx-auto mb-6" />
              <Title level={2} className="text-white mb-6">Ready to Join Our Community?</Title>
              <Paragraph className="text-xl text-white/80 mb-8">
                Take the first step towards finding your support system.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => scrollToSection("groups")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 border-none"
              >
                Explore Support Groups
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Group Details Modal */}
      <Modal
        title="Group Details"
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsVisible(false)}>
            Close
          </Button>,
          <Button
            key="join"
            type="primary"
            loading={selectedGroup && joiningGroups.has(selectedGroup.id)}
            onClick={() => selectedGroup && joinGroup(selectedGroup.id)}
          >
            Join Group
          </Button>,
        ]}
        width={600}
      >
        {selectedGroup && (
          <div>
            <div className="flex items-center mb-4">
              <Avatar
                size={48}
                style={{ backgroundColor: getGroupColor(0) }}
                icon={React.createElement(getGroupIcon(selectedGroup), { className: "w-6 h-6" })}
              />
              <div className="ml-4">
                <Title level={4} className="mb-0">{selectedGroup.name}</Title>
                <Space>
                  <Tag color={selectedGroup.is_private ? 'red' : 'green'}>
                    {selectedGroup.is_private ? 'Private' : 'Public'}
                  </Tag>
                  <Tag>{selectedGroup.approval_status}</Tag>
                </Space>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-4">
              <div>
                <Text strong>Description:</Text>
                <Paragraph className="mt-2">{selectedGroup.description}</Paragraph>
              </div>
              
              <div>
                <Text strong>Members:</Text>
                <Text className="ml-2">{selectedGroup.formatted_members}</Text>
              </div>
              
              <div>
                <Text strong>Created:</Text>
                <Text className="ml-2">{new Date(selectedGroup.createdAt).toLocaleDateString()}</Text>
              </div>
              
              <div>
                <Text strong>Admin:</Text>
                <Text className="ml-2">{selectedGroup.group_admin?.fullName || 'Unknown'}</Text>
              </div>
              
              {selectedGroup.link && (
                <div>
                  <Text strong>External Link:</Text>
                  <a href={selectedGroup.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                    Visit Group <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Footer */}
      <footer className="py-12 backdrop-blur-md bg-white/10 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <Title level={3} className="text-white mb-4">
            {currentService?.title || "Support Groups"}
          </Title>
          <Text className="text-white/60 mb-4">
            Building connections and providing support, one conversation at a time.
          </Text>
          <Space split={<Divider type="vertical" />}>
            <a href="#" className="text-white/60 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white">Contact Us</a>
          </Space>
        </div>
      </footer>
    </div>
  );
};

export default SupportGroupsPage;