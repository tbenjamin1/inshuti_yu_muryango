import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Spin, Empty, Tag, Avatar, Divider, Typography, Space, Row, Col, Tooltip } from 'antd';
import {
  Heart, Users, Shield, Sparkles, MessageCircle, Hash, Send, Facebook, Phone, Slack,
  ExternalLink, Calendar, UserCheck, Lock, Globe, Loader2, Eye, ArrowRight, Star
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
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <Spin size="large" />
        <Text className="text-gray-600 text-lg ml-4">Loading support groups...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <NewNavBar />
      
      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center px-6 pt-28 pb-16">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <Title level={1} className="text-gray-900 mb-6 text-4xl md:text-5xl font-bold">
            {currentService?.title || "Support Groups"}
          </Title>
          <Paragraph className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {currentService?.subtitle || "Join a supportive community where understanding, encouragement, and strength come from people who share your journey"}
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              onClick={() => scrollToSection("groups")}
              className="bg-blue-600 hover:bg-blue-700 border-none rounded-xl px-8 py-6 h-auto text-base font-medium shadow-lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Browse Groups ({groupsList?.length || 0})
            </Button>
            <Button
              size="large"
              onClick={() => scrollToSection("testimonials")}
              className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl px-8 py-6 h-auto text-base font-medium shadow-lg"
            >
              Read Stories
            </Button>
          </Space>
        </div>
      </section>

      {/* Why Support Groups Matter */}
      <section id="why" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-gray-900 mb-6 text-3xl font-bold">Why Support Groups Matter</Title>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with others who understand your journey. Find support, share experiences, and grow together.
            </Text>
          </div>
          <Row gutter={[32, 32]}>
            {[
              { icon: Heart, title: "Understanding & Empathy", description: "Connect with people who truly understand your experiences.", color: "#ef4444" },
              { icon: Shield, title: "Safe Space", description: "Share your thoughts in a judgment-free environment.", color: "#3b82f6" },
              { icon: Sparkles, title: "Strength & Growth", description: "Discover your inner strength and grow alongside others.", color: "#10b981" },
            ].map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white hover:-translate-y-2"
                  bodyStyle={{ padding: '2rem' }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: feature.color }}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <Title level={3} className="text-gray-900 mb-4 text-xl font-semibold">{feature.title}</Title>
                    <Text className="text-gray-600 text-base leading-relaxed">{feature.description}</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Support Groups */}
      <section id="groups" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-gray-900 mb-6 text-3xl font-bold">Available Support Groups</Title>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                      className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white overflow-hidden group"
                      bodyStyle={{ padding: 0 }}
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                              style={{ backgroundColor: color }}
                            >
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <Title level={4} className="mb-1 text-gray-900 font-semibold text-lg">
                                {group.name}
                              </Title>
                              <div className="flex items-center space-x-2">
                                <Tag 
                                  color={group.is_private ? 'red' : 'green'} 
                                  className="rounded-full text-xs font-medium"
                                >
                                  {group.is_private ? (
                                    <><Lock className="w-3 h-3 inline mr-1" />Private</>
                                  ) : (
                                    <><Globe className="w-3 h-3 inline mr-1" />Public</>
                                  )}
                                </Tag>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Paragraph 
                          ellipsis={{ rows: 2 }} 
                          className="text-gray-600 mb-4 text-sm leading-relaxed"
                        >
                          {group.description}
                        </Paragraph>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">{group.formatted_members}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(group.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="px-6 pb-6">
                        <div className="flex items-center space-x-2">
                          <Button
                            type="primary"
                            loading={isJoining}
                            onClick={() => joinGroup(group.id)}
                            className="flex-1 rounded-xl font-medium"
                            style={{ backgroundColor: color, borderColor: color }}
                            icon={<UserCheck className="w-4 h-4" />}
                          >
                            Join Group
                          </Button>
                          <Button
                            onClick={() => showGroupDetails(group)}
                            className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                            icon={<Eye className="w-4 h-4" />}
                          >
                            Details
                          </Button>
                          {/* {group.link && (
                            <Tooltip title="External Link">
                              <Button
                                href={group.link}
                                target="_blank"
                                className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                                icon={<ExternalLink className="w-4 h-4" />}
                              />
                            </Tooltip>
                          )} */}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <div className="text-center py-16">
              <Empty
                description="No support groups available for this service"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-gray-900 mb-6 text-3xl font-bold">Stories from Our Community</Title>
            <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from members who found strength and support in our groups.
            </Text>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl rounded-2xl bg-white text-center mb-8" bodyStyle={{ padding: '3rem' }}>
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <Avatar
                size={80}
                className="mb-6 shadow-lg"
                style={{ backgroundColor: '#3b82f6' }}
              >
                <span className="text-2xl font-semibold">{testimonials[activeTestimonial].name.charAt(0)}</span>
              </Avatar>
              <Paragraph className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                "{testimonials[activeTestimonial].text}"
              </Paragraph>
              <Title level={4} className="text-gray-900 mb-1">{testimonials[activeTestimonial].name}</Title>
              <Text className="text-gray-500">{testimonials[activeTestimonial].platform}</Text>
            </Card>
            <div className="flex justify-center space-x-3">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  type={index === activeTestimonial ? "primary" : "default"}
                  shape="circle"
                  size="small"
                  onClick={() => setActiveTestimonial(index)}
                  className={index === activeTestimonial ? "bg-blue-600 border-blue-600" : "border-gray-300"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <Users className="w-16 h-16 text-white mx-auto mb-6" />
              <Title level={2} className="text-white mb-6 text-3xl font-bold">Ready to Join Our Community?</Title>
              <Paragraph className="text-xl text-white/90 mb-8 leading-relaxed">
                Take the first step towards finding your support system.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={() => scrollToSection("groups")}
                className="bg-white text-white hover:bg-gray-100 border-none rounded-xl px-8 py-6 h-auto text-base font-medium shadow-lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Support Groups
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Group Details Modal */}
      <Modal
        title="Group Details"
        open={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsVisible(false)} className="rounded-lg">
            Close
          </Button>,
          <Button
            key="join"
            type="primary"
            loading={selectedGroup && joiningGroups.has(selectedGroup.id)}
            onClick={() => selectedGroup && joinGroup(selectedGroup.id)}
            className="bg-purple-600 hover:bg-blue-700 border-none rounded-lg"
          >
            Join Group
          </Button>,
        ]}
        width={600}
        className="rounded-2xl"
      >
        {selectedGroup && (
          <div>
            <div className="flex items-center mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: getGroupColor(0) }}
              >
                {React.createElement(getGroupIcon(selectedGroup), { className: "w-8 h-8 text-white" })}
              </div>
              <div className="ml-4">
                <Title level={4} className="mb-2 text-gray-900">{selectedGroup.name}</Title>
                <Space>
                  <Tag color={selectedGroup.is_private ? 'red' : 'green'} className="rounded-full">
                    {selectedGroup.is_private ? 'Private' : 'Public'}
                  </Tag>
                  <Tag className="rounded-full">{selectedGroup.approval_status}</Tag>
                </Space>
              </div>
            </div>
            
            <Divider />
            
            <div className="space-y-4">
              <div>
                <Text strong className="text-gray-900">Description:</Text>
                <Paragraph className="mt-2 text-gray-600">{selectedGroup.description}</Paragraph>
              </div>
              
              <div>
                <Text strong className="text-gray-900">Members:</Text>
                <Text className="ml-2 text-gray-600">{selectedGroup.formatted_members}</Text>
              </div>
              
              <div>
                <Text strong className="text-gray-900">Created:</Text>
                <Text className="ml-2 text-gray-600">{new Date(selectedGroup.createdAt).toLocaleDateString()}</Text>
              </div>
              
              <div>
                <Text strong className="text-gray-900">Admin:</Text>
                <Text className="ml-2 text-gray-600">{selectedGroup.group_admin?.fullName || 'Unknown'}</Text>
              </div>
{/*               
              {selectedGroup.link && (
                <div>
                  <Text strong className="text-gray-900">External Link:</Text>
                  <a href={selectedGroup.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-700">
                    Visit Group <ExternalLink className="w-4 h-4 inline ml-1" />
                  </a>
                </div>
              )} */}
            </div>
          </div>
        )}
      </Modal>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <Title level={3} className="text-white mb-4">
            {currentService?.title || "Support Groups"}
          </Title>
          <Text className="text-gray-400 mb-6">
            Building connections and providing support, one conversation at a time.
          </Text>
          <Space split={<Divider type="vertical" className="border-gray-600" />}>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
          </Space>
        </div>
      </footer>
    </div>
  );
};

export default SupportGroupsPage;