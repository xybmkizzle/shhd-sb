/**
 * Component for displaying search results and suggestions
 * Handles empty states and search suggestions
 */

import { Professional } from '../types';
import ProfessionalCard from './ProfessionalCard';
import { getSuggestedSearches } from '../utils/semanticSearch';

interface Props {
  professionals: Professional[];
  searchQuery: string;
  totalCount: number;
}

export default function SearchResults({ professionals, searchQuery, totalCount }: Props) {
  // Display all professionals if no search query
  if (!searchQuery) {
    return (
      <div className="space-y-6">
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
          />
        ))}
      </div>
    );
  }

  // Handle no results state
  if (professionals.length === 0) {
    const suggestions = getSuggestedSearches(searchQuery);
    
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-center">
        <h3 className="text-xl text-white mb-4">No results found for "{searchQuery}"</h3>
        
        {/* Search suggestions */}
        {suggestions.length > 0 && (
          <>
            <p className="text-gray-400 mb-4">Did you mean to search for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => window.location.search = `?q=${encodeURIComponent(suggestion)}`}
                  className="px-4 py-2 bg-purple-900 text-purple-100 rounded-full hover:bg-purple-800 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </>
        )}
        
        {/* Search tips */}
        <div className="text-gray-400 mt-6">
          <p className="mb-2">Try:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Using more general terms</li>
            <li>Checking for typos</li>
            <li>Describing how you feel (e.g., "feeling anxious")</li>
            <li>Describing what you need help with (e.g., "relationship issues")</li>
          </ul>
        </div>
      </div>
    );
  }

  // Display search results
  return (
    <div>
      <p className="text-right text-gray-400 mb-4">
        Showing {professionals.length} of {totalCount} professionals
      </p>
      <div className="space-y-6">
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}