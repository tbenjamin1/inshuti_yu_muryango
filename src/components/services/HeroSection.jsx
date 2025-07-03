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
const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 text-white pt-28 py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-xl md:text-6xl font-bold mb-6">
          Workshops & Skill Development
          </h1>
          <h1 className="text-lg  font-bold mb-6">
            Craft & Skills Showcase
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your creative potential through our comprehensive workshops
            and skill-building programs designed to inspire and empower.
          </p>
        
        </div>
      </div>
    </div>
  );
export default HeroSection;