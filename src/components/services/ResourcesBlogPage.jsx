import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, Tag as AntTag, Divider } from "antd";
import {
  Search,
  BookOpen,
  Heart,
  Brain,
  Users,
  Calendar,
  Tag,
  ArrowLeft,
  ExternalLink,
  Clock,
  User,
  Share2,
  Bookmark,
} from "lucide-react";
import NewNavBar from "../auth/NewNavBar";
import {
  fetchAsynProducts,
  getAllPaginatedProducts,
  getAllProducts,
  getIsLoadingProducts,
  getUser,
} from "../../redux/transactions/TransactionSlice";
import { useDispatch, useSelector } from "react-redux";
const ResourcesBlogScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = user?.token;
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = "https://ecommerce-backend-0v7j.onrender.com/api/blogs";
  // Fetch blogs with better error handling
  const fetchBlogs = useCallback(async () => {
    if (!token) {
      showMessage("Authentication required", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.blogs || data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  console.log("blogs", blogs);

  const categories = [
    { id: "all", name: "All", icon: BookOpen },
    { id: "mental-health", name: "Mental Health", icon: Brain },
    { id: "wellness", name: "Wellness", icon: Heart },
    { id: "community", name: "Community", icon: Users },
  ];

  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Complete Guide",
      excerpt:
        "Learn about anxiety symptoms, causes, and effective coping strategies.",
      category: "mental-health",
      readTime: "8 min",
      date: "2025-01-15",
      author: "Dr. Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      tags: ["anxiety", "coping", "mental health"],
      content: `
        <h2>What is Anxiety?</h2>
        <p>Anxiety is a natural response to stress and can be beneficial in some situations. However, when anxiety becomes overwhelming or persistent, it can interfere with daily activities and quality of life.</p>
        
        <h3>Common Symptoms</h3>
        <ul>
          <li>Excessive worry or fear</li>
          <li>Restlessness or feeling on edge</li>
          <li>Difficulty concentrating</li>
          <li>Physical symptoms like rapid heartbeat or sweating</li>
          <li>Sleep disturbances</li>
        </ul>
        
        <h3>Effective Coping Strategies</h3>
        <p>There are many evidence-based techniques that can help manage anxiety:</p>
        
        <h4>1. Deep Breathing Exercises</h4>
        <p>Practice the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8.</p>
        
        <h4>2. Progressive Muscle Relaxation</h4>
        <p>Systematically tense and relax different muscle groups to reduce physical tension.</p>
        
        <h4>3. Mindfulness and Meditation</h4>
        <p>Regular mindfulness practice can help you observe anxious thoughts without judgment.</p>
        
        <h4>4. Cognitive Restructuring</h4>
        <p>Challenge negative thought patterns by examining evidence and considering alternative perspectives.</p>
        
        <h3>When to Seek Professional Help</h3>
        <p>If anxiety is significantly impacting your daily life, relationships, or work, consider reaching out to a mental health professional. Therapy, particularly Cognitive Behavioral Therapy (CBT), has been proven highly effective for anxiety disorders.</p>
      `,
      resources: [
        {
          name: "Anxiety and Depression Association of America",
          url: "https://adaa.org",
        },
        {
          name: "National Institute of Mental Health",
          url: "https://nimh.nih.gov",
        },
      ],
    },
    {
      id: 2,
      title: "Daily Wellness Routines for Better Mental Health",
      excerpt:
        "Discover simple daily practices that can transform your mental wellbeing.",
      category: "wellness",
      readTime: "6 min",
      date: "2025-01-12",
      author: "Maria Rodriguez, LCSW",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      tags: ["wellness", "routine", "self-care"],
      content: `
        <h2>Building Your Daily Wellness Routine</h2>
        <p>Creating consistent daily habits can significantly improve your mental health and overall wellbeing. Here are evidence-based practices you can incorporate into your routine.</p>
        
        <h3>Morning Routine</h3>
        <h4>1. Mindful Wake-Up (5 minutes)</h4>
        <p>Before checking your phone, spend 5 minutes doing deep breathing or gentle stretching.</p>
        
        <h4>2. Gratitude Practice (3 minutes)</h4>
        <p>Write down three things you're grateful for each morning to start your day with positivity.</p>
        
        <h4>3. Hydration and Nutrition</h4>
        <p>Start with a glass of water and a nutritious breakfast to fuel your body and mind.</p>
        
        <h3>Throughout the Day</h3>
        <h4>Movement Breaks</h4>
        <p>Take short walks, stretch, or do brief exercise sessions to boost endorphins and reduce stress.</p>
        
        <h4>Mindful Moments</h4>
        <p>Practice 2-minute breathing exercises during transitions between activities.</p>
        
        <h3>Evening Routine</h3>
        <h4>Digital Detox</h4>
        <p>Turn off screens 1 hour before bed to improve sleep quality.</p>
        
        <h4>Reflection Journal</h4>
        <p>Write about your day, noting accomplishments and areas for growth.</p>
        
        <h3>Weekly Wellness Activities</h3>
        <ul>
          <li>Nature walks or outdoor activities</li>
          <li>Social connections with friends or family</li>
          <li>Creative activities like art, music, or writing</li>
          <li>Learning something new</li>
        </ul>
      `,
      resources: [
        {
          name: "Wellness Recovery Action Plan",
          url: "https://mentalhealthrecovery.com",
        },
        { name: "CDC - Mental Health", url: "https://cdc.gov/mentalhealth" },
      ],
    },
    {
      id: 3,
      title: "Building Support Networks: Community Connection",
      excerpt:
        "How to create meaningful connections and find your support community.",
      category: "community",
      readTime: "7 min",
      date: "2025-01-10",
      author: "Dr. Michael Chen",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop",
      tags: ["community", "support", "connection"],
      content: `
        <h2>The Power of Community in Mental Health</h2>
        <p>Strong social connections are fundamental to mental health and wellbeing. Research shows that people with robust support networks have lower rates of depression and anxiety.</p>
        
        <h3>Types of Support Networks</h3>
        <h4>1. Emotional Support</h4>
        <p>People who provide empathy, caring, and understanding during difficult times.</p>
        
        <h4>2. Practical Support</h4>
        <p>Those who offer tangible help like assistance with tasks or resources.</p>
        
        <h4>3. Informational Support</h4>
        <p>Individuals who share knowledge, advice, and guidance.</p>
        
        <h4>4. Social Support</h4>
        <p>People who provide companionship and a sense of belonging.</p>
        
        <h3>Building Your Support Network</h3>
        <h4>Start Small</h4>
        <p>Focus on nurturing existing relationships before seeking new ones.</p>
        
        <h4>Be Authentic</h4>
        <p>Share your genuine self to attract meaningful connections.</p>
        
        <h4>Practice Active Listening</h4>
        <p>Show genuine interest in others' experiences and feelings.</p>
        
        <h4>Offer Support</h4>
        <p>Be willing to help others - relationships are reciprocal.</p>
        
        <h3>Finding Community</h3>
        <ul>
          <li>Join interest-based groups or clubs</li>
          <li>Volunteer for causes you care about</li>
          <li>Attend community events or workshops</li>
          <li>Participate in online communities</li>
          <li>Join support groups</li>
        </ul>
        
        <h3>Maintaining Connections</h3>
        <p>Regular communication, showing appreciation, and being reliable are key to maintaining strong relationships.</p>
      `,
      resources: [
        { name: "Mental Health America", url: "https://mhanational.org" },
        {
          name: "NAMI - National Alliance on Mental Illness",
          url: "https://nami.org",
        },
      ],
    },
    {
      id: 4,
      title: "Mindfulness Meditation for Beginners",
      excerpt: "Start your mindfulness journey with these simple techniques.",
      category: "mental-health",
      readTime: "5 min",
      date: "2025-01-08",
      author: "Jennifer Park, MFT",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      tags: ["mindfulness", "meditation", "beginners"],
      content: `
        <h2>Getting Started with Mindfulness</h2>
        <p>Mindfulness is the practice of being present and fully engaged with whatever we're doing at the moment. It's a simple yet powerful tool for improving mental health.</p>
        
        <h3>Benefits of Mindfulness</h3>
        <ul>
          <li>Reduced stress and anxiety</li>
          <li>Improved focus and concentration</li>
          <li>Better emotional regulation</li>
          <li>Enhanced self-awareness</li>
          <li>Better sleep quality</li>
        </ul>
        
        <h3>Basic Mindfulness Techniques</h3>
        <h4>1. Mindful Breathing</h4>
        <p>Focus on your breath. Notice the sensation of air entering and leaving your body.</p>
        
        <h4>2. Body Scan</h4>
        <p>Mentally scan your body from head to toe, noticing any sensations without judgment.</p>
        
        <h4>3. Mindful Observation</h4>
        <p>Choose an object and observe it closely for 5 minutes, noting its colors, textures, and details.</p>
        
        <h4>4. Walking Meditation</h4>
        <p>Walk slowly and deliberately, focusing on each step and the sensations in your feet.</p>
        
        <h3>Starting Your Practice</h3>
        <p>Begin with just 5 minutes daily. Consistency is more important than duration.</p>
        
        <h3>Common Challenges</h3>
        <ul>
          <li>Wandering mind - this is normal, gently return focus</li>
          <li>Impatience - progress takes time</li>
          <li>Judgment - observe thoughts without criticism</li>
        </ul>
      `,
      resources: [
        { name: "Mindful.org", url: "https://mindful.org" },
        {
          name: "UCLA Mindful Awareness Research Center",
          url: "https://marc.ucla.edu",
        },
      ],
    },
    {
      id: 5,
      title: "Sleep Hygiene: The Foundation of Mental Health",
      excerpt:
        "Understand the critical role of sleep in maintaining mental wellness.",
      category: "wellness",
      readTime: "9 min",
      date: "2025-01-05",
      author: "Dr. Lisa Thompson",
      image:
        "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop",
      tags: ["sleep", "health", "wellness"],
      content: `
        <h2>The Sleep-Mental Health Connection</h2>
        <p>Quality sleep is essential for mental health. Poor sleep can contribute to anxiety, depression, and other mental health challenges.</p>
        
        <h3>Why Sleep Matters</h3>
        <ul>
          <li>Memory consolidation</li>
          <li>Emotional regulation</li>
          <li>Stress recovery</li>
          <li>Cognitive function</li>
          <li>Immune system support</li>
        </ul>
        
        <h3>Sleep Hygiene Principles</h3>
        <h4>1. Consistent Sleep Schedule</h4>
        <p>Go to bed and wake up at the same time every day, even on weekends.</p>
        
        <h4>2. Create a Sleep-Friendly Environment</h4>
        <ul>
          <li>Keep bedroom cool (60-67°F)</li>
          <li>Use blackout curtains or eye mask</li>
          <li>Minimize noise or use white noise</li>
          <li>Invest in a comfortable mattress and pillows</li>
        </ul>
        
        <h4>3. Develop a Bedtime Routine</h4>
        <p>Start winding down 1 hour before bed with calming activities.</p>
        
        <h4>4. Avoid Sleep Disruptors</h4>
        <ul>
          <li>Caffeine after 2 PM</li>
          <li>Large meals close to bedtime</li>
          <li>Screens 1 hour before sleep</li>
          <li>Alcohol and nicotine</li>
        </ul>
        
        <h3>When to Seek Help</h3>
        <p>If sleep problems persist despite good sleep hygiene, consult a healthcare provider. You may have an underlying sleep disorder.</p>
      `,
      resources: [
        { name: "Sleep Foundation", url: "https://sleepfoundation.org" },
        {
          name: "National Sleep Foundation",
          url: "https://sleepfoundation.org",
        },
      ],
    },
    {
      id: 6,
      title: "Crisis Resources and Emergency Support",
      excerpt:
        "Essential resources for immediate mental health support and crisis intervention.",
      category: "mental-health",
      readTime: "4 min",
      date: "2025-01-03",
      author: "Crisis Support Team",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
      tags: ["crisis", "emergency", "support"],
      content: `
        <h2>When You Need Immediate Help</h2>
        <p>If you're experiencing a mental health crisis, remember that help is available 24/7. You don't have to face this alone.</p>
        
        <h3>Emergency Numbers</h3>
        <ul>
          <li><strong>988 Suicide & Crisis Lifeline</strong> - Call or text 988</li>
          <li><strong>Crisis Text Line</strong> - Text HOME to 741741</li>
          <li><strong>Emergency Services</strong> - Call 911</li>
        </ul>
        
        <h3>Warning Signs of Crisis</h3>
        <ul>
          <li>Thoughts of self-harm or suicide</li>
          <li>Feeling hopeless or trapped</li>
          <li>Severe anxiety or panic attacks</li>
          <li>Inability to function in daily life</li>
          <li>Substance abuse escalation</li>
        </ul>
        
        <h3>How to Help Someone in Crisis</h3>
        <h4>1. Listen Without Judgment</h4>
        <p>Let them express their feelings without trying to fix or minimize their experience.</p>
        
        <h4>2. Ask Direct Questions</h4>
        <p>Don't be afraid to ask if they're thinking about hurting themselves.</p>
        
        <h4>3. Stay With Them</h4>
        <p>Don't leave them alone if they're in immediate danger.</p>
        
        <h4>4. Connect to Resources</h4>
        <p>Help them contact crisis services or emergency support.</p>
        
        <h3>Self-Care During Crisis</h3>
        <ul>
          <li>Use grounding techniques (5-4-3-2-1 method)</li>
          <li>Practice deep breathing</li>
          <li>Reach out to trusted friends or family</li>
          <li>Remove means of self-harm</li>
          <li>Go to a safe place</li>
        </ul>
      `,
      resources: [
        {
          name: "988 Suicide & Crisis Lifeline",
          url: "https://988lifeline.org",
        },
        { name: "Crisis Text Line", url: "https://crisistextline.org" },
      ],
    },
  ];

  const filteredResources = blogs&&blogs.filter((resource) => {
    const matchesCategory =
      activeTab === "all" || resource.category === activeTab;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <NewNavBar />
      <div className="bg-white shadow-sm border-b border-pink-100 pt-28">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            {/* <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button> */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Resources & Blog
                </h1>
                <p className="text-gray-600 text-sm">
                  Mental health resources and wellness guides
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeTab === category.id
                    ? "bg-pink-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-pink-50 border border-pink-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                  {resource.estimated_reading_time}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {formatDate(resource.createdAt)}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                 
                    <span
              
                      className="inline-flex items-center gap-1 px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded-full"
                    >
                      <Tag className="w-3 h-3" />
                      {resource.service?.title}
                    </span>
             
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => handleResourceClick(resource)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        style={{ maxWidth: "800px" }}
        className="resource-modal"
      >
        {selectedResource && (
          <div className="resource-detail">
            {/* Modal Header */}
            <div className="relative mb-6">
              <img
                src={selectedResource.thumbnail}
                alt={selectedResource.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {selectedResource.estimated_reading_time}
                </span>
              </div>
            </div>

            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedResource.title}
              </h1>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {selectedResource.description}
                </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedResource.author?selectedResource.author:'Unknown' }</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedResource.createdAt)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
              
                  <AntTag color="pink" className="rounded-full">
                     {selectedResource.service?.title}
                  </AntTag>
            
              </div>

              {/* Action Buttons */}
              {/* <div className="flex gap-2">
                <Button
                  icon={<Share2 className="w-4 h-4" />}
                  size="small"
                  className="flex items-center gap-1"
                >
                  Share
                </Button>
                <Button
                  icon={<Bookmark className="w-4 h-4" />}
                  size="small"
                  className="flex items-center gap-1"
                >
                  Save
                </Button>
              </div> */}
            </div>

            <Divider />

            {/* Content */}
            <div
              className="prose prose-pink max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: selectedResource.content }}
              style={{
                lineHeight: "1.6",
                fontSize: "16px",
              }}
            />

            {/* Additional Resources */}
            {selectedResource.resources &&
              selectedResource.resources.length > 0 && (
                <>
                  <Divider />
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Additional Resources
                    </h3>
                    <div className="space-y-2">
                      {selectedResource.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{resource.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResourcesBlogScreen;
