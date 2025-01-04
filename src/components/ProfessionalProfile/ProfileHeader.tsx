/**
 * Header component for professional profiles
 * Displays professional's image, name, title, and key information
 */

import { Star, Video, Users } from 'lucide-react';
import { Professional } from '../../types';

interface Props {
  professional: Professional;
}

export default function ProfileHeader({ professional }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Profile image */}
      <img 
        src={professional.imageUrl} 
        alt={professional.name}
        className="w-48 h-48 rounded-full object-cover"
      />
      
      <div className="flex-1">
        {/* Name, title, and rating */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">{professional.name}</h1>
            <p className="text-xl text-gray-300 mt-1">{professional.title}</p>
          </div>
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <span className="ml-2 text-lg text-gray-300">
              {professional.rating} ({professional.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-gray-300 text-lg leading-relaxed">{professional.bio}</p>
        
        {/* Specialties */}
        <div className="mt-6 flex flex-wrap gap-3">
          {professional.specialties.map((specialty) => (
            <span 
              key={specialty}
              className="px-4 py-2 bg-purple-900 text-purple-100 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Session types */}
        <div className="mt-6 flex gap-6">
          {professional.sessionTypes.includes('Virtual') && (
            <div className="flex items-center text-gray-300">
              <Video className="w-5 h-5 mr-2" />
              <span>Virtual Sessions</span>
            </div>
          )}
          {professional.sessionTypes.includes('In-person') && (
            <div className="flex items-center text-gray-300">
              <Users className="w-5 h-5 mr-2" />
              <span>In-person Sessions</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}