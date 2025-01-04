/**
 * Main directory page for browsing professionals
 * Handles search, filtering, and results display
 */

import { useState } from 'react';
import { professionals } from '../data/professionals';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import SearchResults from '../components/SearchResults';
import SearchSummary from '../components/SearchSummary';
import { filterProfessionals } from '../utils/filterUtils';
import { semanticSearch, findRelevantSpecialties } from '../utils/semanticSearch';
import { FilterOptions } from '../types';

export default function Directory() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    specialty: '',
    community: '',
    gender: '',
    sessionType: ''
  });

  /**
   * Handle search input changes
   * Updates search query and automatically sets relevant specialty filter
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const relevantSpecialties = findRelevantSpecialties(query);
    if (relevantSpecialties.length > 0) {
      setFilters(prev => ({ ...prev, specialty: relevantSpecialties[0] }));
    }
  };

  /**
   * Handle filter changes
   * Updates individual filter values
   */
  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  // Apply semantic search and filters
  const searchResults = semanticSearch(professionals, searchQuery);
  const filteredProfessionals = filterProfessionals(searchResults, filters);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#111' }}>      
      <main className="flex-1 py-8">
        {/* Search and filter interface */}
        <SearchFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />
        
        {/* Results section */}
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <SearchSummary 
            searchQuery={searchQuery}
            resultCount={filteredProfessionals.length}
          />
          <SearchResults
            professionals={filteredProfessionals}
            searchQuery={searchQuery}
            totalCount={professionals.length}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}