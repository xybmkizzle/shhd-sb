/**
 * Utility functions for filtering professionals based on search criteria
 * Handles filtering by specialty, community, gender, and search terms
 */

import { Professional, FilterOptions } from '../types';

/**
 * Filter professionals based on search criteria and filters
 * @param professionals Array of professionals to filter
 * @param filters Active filter options
 * @param searchQuery Text search query
 * @returns Filtered array of professionals
 */
export function filterProfessionals(
  professionals: Professional[],
  filters: FilterOptions,
  searchQuery: string
): Professional[] {
  return professionals.filter(professional => {
    // Apply text search filter
    if (searchQuery) {
      const searchText = `${professional.name} ${professional.title} ${professional.bio} ${professional.specialties.join(' ')}`.toLowerCase();
      if (!searchText.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }

    // Apply specialty filter
    if (filters.specialty && !professional.specialties.includes(filters.specialty)) {
      return false;
    }

    // Apply community filter
    if (filters.community && !professional.verifications.some(v => 
      v.toLowerCase().includes(filters.community.toLowerCase())
    )) {
      return false;
    }

    // Apply gender filter
    if (filters.gender && professional.gender.toLowerCase() !== filters.gender.toLowerCase()) {
      return false;
    }

    return true;
  });
}