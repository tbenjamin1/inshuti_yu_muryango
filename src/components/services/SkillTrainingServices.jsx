import React, { useState } from "react";
import NewNavBar from "../auth/NewNavBar";

const SkillTrainingServices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Arts & Crafts",
      subtitle: "Paper Work Mastery",
      description:
        "Master the fundamental skills of paper-based artistry through structured learning and creative exploration.",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
        </svg>
      ),
      skillsLearned: [
        "Precision cutting and folding techniques",
        "Color theory and composition",
        "Pattern recognition and replication",
        "Spatial reasoning and geometry",
        "Fine motor skill development",
        "Creative problem-solving",
      ],
      technicalSkills: [
        "Origami folding patterns",
        "Paper sculpture construction",
        "Collage composition methods",
        "Texture creation techniques",
        "Measurement and scaling",
        "Tool handling and safety",
      ],
      softSkills: [
        "Patience and persistence",
        "Attention to detail",
        "Following instructions",
        "Creative thinking",
        "Time management",
        "Self-confidence building",
      ],
      details: {
        duration: "2-3 hours per session",
        level: "Beginner to Advanced",
        progressionPath:
          "Basic folding → Complex structures → Original designs",
        certification: "Paper Arts Certificate upon completion",
      },
      gradient: "from-blue-400 to-purple-400",
    },
    {
      id: 2,
      title: "Drawing",
      subtitle: "Foundation Art Skills",
      description:
        "Build essential drawing skills from basic techniques to advanced artistic expression and visual communication.",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87M3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z" />
        </svg>
      ),
      skillsLearned: [
        "Observational drawing techniques",
        "Perspective and proportion",
        "Light and shadow understanding",
        "Line quality and control",
        "Compositional skills",
        "Visual storytelling",
      ],
      technicalSkills: [
        "Pencil grip and control",
        "Shading and blending methods",
        "Cross-hatching techniques",
        "Gesture drawing",
        "Still life composition",
        "Portrait fundamentals",
      ],
      softSkills: [
        "Observational skills",
        "Hand-eye coordination",
        "Patience and focus",
        "Self-expression",
        "Critical thinking",
        "Artistic confidence",
      ],
      details: {
        duration: "1.5-2 hours per session",
        level: "Beginner to Intermediate",
        progressionPath: "Basic shapes → Complex forms → Personal style",
        certification: "Drawing Fundamentals Certificate",
      },
      gradient: "from-green-400 to-blue-400",
    },
    {
      id: 3,
      title: "Pottery",
      subtitle: "Live Art Creation",
      description:
        "Develop hands-on pottery skills through live demonstrations, guided practice, and creative experimentation.",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4V8C14 9.1 13.1 10 12 10S10 9.1 10 8V4C10 2.9 10.9 2 12 2M21 9V7L15 13V21C15 21.6 14.6 22 14 22H10C9.4 22 9 21.6 9 21V13L3 7V9C3 10.1 3.9 11 5 11V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V11C20.1 11 21 10.1 21 9Z" />
        </svg>
      ),
      skillsLearned: [
        "Clay preparation and handling",
        "Wheel throwing techniques",
        "Hand-building methods",
        "Glazing and finishing",
        "Kiln operation basics",
        "Form and function balance",
      ],
      technicalSkills: [
        "Centering clay on wheel",
        "Pulling and shaping walls",
        "Trimming and finishing",
        "Surface decoration techniques",
        "Glazing application methods",
        "Firing temperature control",
      ],
      softSkills: [
        "Mindfulness and presence",
        "Tactile sensitivity",
        "Patience with process",
        "Problem-solving",
        "Stress management",
        "Artistic expression",
      ],
      details: {
        duration: "3-4 hours per session",
        level: "Beginner to Advanced",
        progressionPath: "Hand building → Wheel throwing → Advanced techniques",
        certification: "Pottery Arts Certificate",
      },
      gradient: "from-orange-400 to-red-400",
    },
  ];

  const ServiceCard = ({ service }) => (
    <div
      className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 hover:border-pink-300 cursor-pointer transform hover:scale-105"
      onClick={() => setSelectedService(service)}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {service.title}
      </h3>
      <p className="text-pink-600 font-medium text-sm mb-3">
        {service.subtitle}
      </p>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {service.description}
      </p>
      <div className="text-xs text-gray-500 mb-4">
        {service.skillsLearned.length} Core Skills •{" "}
        {service.technicalSkills.length} Technical Skills
      </div>
      <button className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200">
        Join Group →
      </button>
    </div>
  );

  const ServiceModal = ({ service, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center`}
              >
                {service.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {service.title}
                </h2>
                <p className="text-pink-600 font-medium">{service.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
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

          <div className="mb-6">
            <p className="text-gray-600 leading-relaxed text-lg">
              {service.description}
            </p>
          </div>

          {/* Skills Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Core Skills
              </h3>
              <ul className="space-y-2">
                {service.skillsLearned.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-blue-700"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Technical Skills
              </h3>
              <ul className="space-y-2">
                {service.technicalSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-green-700"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Soft Skills
              </h3>
              <ul className="space-y-2">
                {service.softSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-purple-700"
                  >
                    <svg
                      className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Learning Progression Path
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex-1 bg-white rounded-lg p-3 text-center">
                <div className="font-medium text-gray-800">Beginner</div>
                <div className="text-xs text-gray-600 mt-1">
                  Foundation & Basics
                </div>
              </div>
              <svg
                className="w-4 h-4 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 bg-white rounded-lg p-3 text-center">
                <div className="font-medium text-gray-800">Intermediate</div>
                <div className="text-xs text-gray-600 mt-1">
                  Skill Development
                </div>
              </div>
              <svg
                className="w-4 h-4 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 bg-white rounded-lg p-3 text-center">
                <div className="font-medium text-gray-800">Advanced</div>
                <div className="text-xs text-gray-600 mt-1">
                  Mastery & Style
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              <strong>Path:</strong> {service.details.progressionPath}
            </div>
          </div>

          {/* Course Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Course Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {service.details.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{service.details.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certification:</span>
                  <span className="font-medium">
                    {service.details.certification}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Skills Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Core Skills:</span>
                  <span className="font-medium">
                    {service.skillsLearned.length} skills
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Technical Skills:</span>
                  <span className="font-medium">
                    {service.technicalSkills.length} skills
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Soft Skills:</span>
                  <span className="font-medium">
                    {service.softSkills.length} skills
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
              Enroll Now
            </button>
            <button className="flex-1 border border-pink-600 text-pink-600 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors">
              Download Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <NewNavBar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 pt-28">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Professional Skills Training
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Develop valuable skills through hands-on training programs
              designed to build both technical expertise and personal
              capabilities for lifelong learning and career advancement.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Skills Overview */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Skills-Focused Learning Approach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our training programs are structured around measurable skill
              development, ensuring you gain practical abilities that enhance
              both personal growth and professional opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Core Skills
              </h3>
              <p className="text-gray-600 text-sm">
                Essential abilities that form the foundation of each craft and
                creative discipline.
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Technical Skills
              </h3>
              <p className="text-gray-600 text-sm">
                Specialized techniques and practical knowledge for
                professional-level execution.
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Soft Skills
              </h3>
              <p className="text-gray-600 text-sm">
                Personal development skills that enhance creativity,
                communication, and professional growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default SkillTrainingServices;
