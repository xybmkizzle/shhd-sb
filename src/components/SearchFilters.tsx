/**
 * Search and filter interface component
 * Provides search input and filter options for professionals directory
 */

import { Search } from 'lucide-react';
import { SPECIALTIES, COMMUNITIES, GENDERS } from '../constants/filters';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (type: string, value: string) => void;
}

export default function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      {/* Filter toggle button */}
      <button className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800">
        Filters
      </button>

      {/* Search section */}
      <div className="space-y-4">
        <h2 className="text-gray-300">Find a Healer</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="What do you need help with?"
            className="w-full bg-transparent border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Filter options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Specialties filter */}
        <div className="space-y-2">
          <label className="text-gray-300">Specialties</label>
          <select 
            className="w-full bg-transparent border border-gray-700 rounded-lg py-2 px-3 text-white"
            onChange={(e) => onFilterChange('specialty', e.target.value)}
          >
            <option value="">All specialties</option>
            {SPECIALTIES.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        {/* Communities filter */}
        <div className="space-y-2">
          <label className="text-gray-300">Communities</label>
          <select 
            className="w-full bg-transparent border border-gray-700 rounded-lg py-2 px-3 text-white"
            onChange={(e) => onFilterChange('community', e.target.value)}
          >
            <option value="">All communities</option>
            {COMMUNITIES.map(community => (
              <option key={community} value={community}>{community}</option>
            ))}
          </select>
        </div>

        {/* Gender filter */}
        <div className="space-y-2">
          <label className="text-gray-300">Gender</label>
          <select 
            className="w-full bg-transparent border border-gray-700 rounded-lg py-2 px-3 text-white"
            onChange={(e) => onFilterChange('gender', e.target.value)}
          >
            <option value="">Any gender</option>
            {GENDERS.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}