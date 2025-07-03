import React, { useState } from 'react';
import { Star, Clock, Users, Award, ChevronRight, Heart, BookOpen, Palette, Scissors, Camera, Music, Paintbrush } from 'lucide-react';
import NewNavBar from '../auth/NewNavBar';

export default function CraftSkillsShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    {
      id: 1,
      name: "Textile Arts",
      icon: <Paintbrush className="w-6 h-6" />,
      description: "Master the art of weaving, embroidery, and fabric design",
      level: "Beginner to Advanced",
      duration: "8 weeks",
      participants: 24,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Creative Writing",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Develop your storytelling skills and find your unique voice",
      level: "All Levels",
      duration: "6 weeks",
      participants: 18,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Digital Art",
      icon: <Palette className="w-6 h-6" />,
      description: "Create stunning digital artwork using modern tools and techniques",
      level: "Intermediate",
      duration: "10 weeks",
      participants: 32,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Photography",
      icon: <Camera className="w-6 h-6" />,
      description: "Capture life's moments with professional photography techniques",
      level: "Beginner to Advanced",
      duration: "12 weeks",
      participants: 28,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Music Production",
      icon: <Music className="w-6 h-6" />,
      description: "Learn to create, mix, and produce your own music",
      level: "Intermediate",
      duration: "14 weeks",
      participants: 15,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Paper Crafts",
      icon: <Scissors className="w-6 h-6" />,
      description: "Transform simple paper into beautiful artistic creations",
      level: "Beginner",
      duration: "4 weeks",
      participants: 20,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      skill: "Textile Arts",
      text: "This program completely transformed my understanding of fabric design. The instructors are incredibly knowledgeable and supportive.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c6f4fb35?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      skill: "Digital Art",
      text: "I went from complete beginner to creating professional-quality artwork. The progression is perfectly paced.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      skill: "Creative Writing",
      text: "Found my voice as a writer through this amazing program. The community support is incredible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8 text-pink-500" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Small Group Settings",
      description: "Personalized attention with maximum 15 students per class"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Flexible Scheduling",
      description: "Evening and weekend options to fit your busy lifestyle"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Supportive Community",
      description: "Connect with like-minded individuals who share your passion"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <NewNavBar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white pt-28 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Craft & Skills Showcase
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover your creative potential through our comprehensive workshops and skill-building programs designed to inspire and empower.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-200">
                Explore Programs
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'programs', label: 'Programs' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'features', label: 'Features' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unlock Your Creative Potential
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Craft & Skills Showcase is more than just a workshop series—it's a transformative journey 
                that connects you with your inner artist. Whether you're a complete beginner or looking to 
                refine existing skills, our carefully curated programs provide the perfect environment for 
                creative growth and self-discovery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why Choose Our Programs?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    Comprehensive curriculum designed by industry experts
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    Hands-on learning with immediate feedback and support
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    Access to professional-grade tools and materials
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    Networking opportunities with fellow creatives
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                    Portfolio development and exhibition opportunities
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
                  <div className="text-gray-600 mb-4">Students Empowered</div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                  <div className="text-gray-600 mb-4">Satisfaction Rate</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-gray-600">Skill Categories</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Skill Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our diverse range of creative programs, each designed to provide 
                comprehensive skill development and personal growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map(skill => (
                <div
                  key={skill.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200"
                >
                  <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
                    <img
                      src={skill.image}
                      alt={skill.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      {skill.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {skill.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {skill.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Level:</span>
                        <span className="font-medium text-gray-700">{skill.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-700">{skill.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-medium text-gray-700">{skill.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-700 ml-1">{skill.rating}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedSkill(skill)}
                      className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Students Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from students who discovered their creative potential through our programs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.skill}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Program Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover what makes our craft and skills programs unique and effective.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Creative Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students who have discovered their artistic potential through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors duration-200">
              Enroll Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSkill.name}</h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <img
                src={selectedSkill.image}
                alt={selectedSkill.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <p className="text-gray-600 mb-6">{selectedSkill.description}</p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{selectedSkill.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Level</h4>
                    <p className="text-gray-600">{selectedSkill.level}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What You'll Learn</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Fundamental techniques and principles</li>
                    <li>• Advanced skills and professional practices</li>
                    <li>• Portfolio development and presentation</li>
                    <li>• Industry insights and career guidance</li>
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200">
                  Enroll in This Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}