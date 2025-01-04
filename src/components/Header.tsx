/**
 * Main application header component
 * Contains logo, navigation, and professional signup button
 */

import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#111' }} className="text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          {/* Logo and site title */}
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-purple-400" />
            <h1 className="ml-3 text-2xl font-bold text-white">
              Safe Haven Healers
            </h1>
          </Link>
          
          {/* Professional signup button */}
          <Link
            to="/onboarding"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Join as Professional
          </Link>
        </div>
      </div>
    </header>
  );
}