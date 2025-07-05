import React, { useState } from "react";
import {
  Star,
  Clock,
  Users,
  ChevronRight,
  Heart,
  BookOpen,
  Palette,
  Scissors,
  Camera,
  Music,
  Paintbrush,
  ShoppingBag,
} from "lucide-react";
import WorkshopsPrograms from "../auth/WorkshopsPrograms";
import ProductListing from "./ProductListing";
import NewNavBar from "../auth/NewNavBar";
import HeroSection from "./HeroSection";
import TabNavigation from "./TabNavigation";
import TestimonialCard from "./TestimonialCard";








const SkillModal = ({ skill, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{skill.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <img
          src={skill.image}
          alt={skill.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <p className="text-gray-600 mb-6">{skill.description}</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
              <p className="text-gray-600">{skill.duration}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Level</h4>
              <p className="text-gray-600">{skill.level}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              What You'll Learn
            </h4>
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
);

const CTASection = () => (
 <div className="relative bg-gradient-to-r from-pink-100 to-purple-100 text-white py-20">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">
        Ready to Begin Your Creative Journey?
      </h2>
      <p className="text-xl mb-8 opacity-90">
        Join hundreds of Mothers who have discovered their artistic potential
        through our programs.
      </p>
     
    </div>
  </div>
);

// Main Component
export default function CraftSkillsShowcase() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSkill, setSelectedSkill] = useState(null);



  const testimonials = [
    {
      name: "Sarah Johnson",
      skill: "Textile Arts",
      text: "This program completely transformed my understanding of fabric design. The instructors are incredibly knowledgeable and supportive.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616c6f4fb35?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      skill: "Digital Art",
      text: "I went from complete beginner to creating professional-quality artwork. The progression is perfectly paced.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
    {
      name: "Emma Rodriguez",
      skill: "Creative Writing",
      text: "Found my voice as a writer through this amazing program. The community support is incredible.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <NewNavBar />
      <div className="bg-white shadow-sm border-b border-pink-100 pt-28">
      <HeroSection    />
      </div>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unlock Your Creative Potential
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our Craft & Skills Showcase is more than just a workshop
                series—it's a transformative journey that connects you with your
                inner artist. Whether you're a complete beginner or looking to
                refine existing skills, our carefully curated programs provide
                the perfect environment for creative growth and self-discovery.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why Choose Our Programs?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Comprehensive curriculum designed by industry experts",
                    "Hands-on learning with immediate feedback and support",
                    "Access to professional-grade tools and materials",
                    "Networking opportunities with fellow creatives",
                    "Portfolio development and exhibition opportunities",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 mb-4">Mothers Empowered</div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    95%
                  </div>
                  <div className="text-gray-600 mb-4">Satisfaction Rate</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    12
                  </div>
                  <div className="text-gray-600">Skill Categories</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Skill Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our diverse range of creative programs, each
                designed to provide comprehensive skill development and personal
                growth.
              </p>
            </div>
            <div>
             
              <WorkshopsPrograms />
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Mothers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from Mothers who discovered their creative
                potential through our programs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard  key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Student Creations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover amazing products and artworks created by our talented
                Mothers in their workshops.
              </p>
            </div>
            <div className="">
             
              <ProductListing />
            </div>
          </div>
        )}
      </div>

      <CTASection />

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
