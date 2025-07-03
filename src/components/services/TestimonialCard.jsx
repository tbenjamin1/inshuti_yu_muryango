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

const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
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
  );

export default TestimonialCard;