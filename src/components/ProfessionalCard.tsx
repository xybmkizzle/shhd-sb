/**
 * Card component for displaying professional information
 */

import { CheckCircle, Star, Video, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Professional } from '../types';
import HighlightedText from './HighlightedText';

interface ProfessionalCardProps {
  professional: Professional;
  searchQuery?: string;
}

export default function ProfessionalCard({ professional, searchQuery = '' }: ProfessionalCardProps) {
  return (
    <div className="rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ backgroundColor: '#191919' }}>
      {/* Profile Image Section */}
      <Link to={`/professional/${professional.id}`}>
        <img 
          src={professional.imageUrl} 
          alt={professional.name}
          className="w-full aspect-square object-cover rounded-lg hover:opacity-90 transition-opacity"
        />
      </Link>
      
      {/* Professional Details Section */}
      <div className="md:col-span-2 space-y-4">
        {/* Header with name and rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-white">
            <HighlightedText text={professional.name} searchQuery={searchQuery} />
          </h2>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-300">{professional.rating}</span>
          </div>
        </div>
        
        {/* Verifications */}
        <div className="space-y-1">
          {professional.verifications.map((verification) => (
            <div key={verification} className="flex items-center text-purple-400">
              <CheckCircle className="w-4 h-4 mr-2" />
              <HighlightedText text={verification} searchQuery={searchQuery} className="text-sm" />
            </div>
          ))}
        </div>

        {/* Professional info */}
        <p className="text-gray-300">
          <HighlightedText text={professional.title} searchQuery={searchQuery} />
        </p>
        <p className="text-gray-400">
          <HighlightedText text={professional.location} searchQuery={searchQuery} />
        </p>

        {/* Bio section */}
        <h3 className="text-white font-semibold mt-6">About Me</h3>
        <p className="text-gray-300">
          <HighlightedText text={professional.bio} searchQuery={searchQuery} />
        </p>

        {/* Specialties */}
        <h3 className="text-white font-semibold">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {professional.specialties.map((specialty) => (
            <span 
              key={specialty}
              className="px-3 py-1 bg-purple-900 text-purple-100 rounded-full text-sm"
            >
              <HighlightedText text={specialty} searchQuery={searchQuery} />
            </span>
          ))}
        </div>

        {/* Session types */}
        <div className="flex items-center gap-4 mt-4">
          {professional.sessionTypes.includes('Virtual') && (
            <div className="flex items-center text-gray-300">
              <Video className="w-4 h-4 mr-1" />
              <span className="text-sm">Virtual</span>
            </div>
          )}
          {professional.sessionTypes.includes('In-person') && (
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-1" />
              <span className="text-sm">In-person</span>
            </div>
          )}
        </div>

        {/* Profile link */}
        <Link
          to={`/professional/${professional.id}`}
          className="inline-block px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 hover:text-white transition-colors mt-4 rounded-lg"
        >
          View My Profile
        </Link>
      </div>
    </div>
  );
}