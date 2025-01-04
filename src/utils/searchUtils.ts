/**
 * Search utility functions
 * Provides text highlighting and professional search functionality
 */

import { Professional } from '../types';

/**
 * Highlight search terms within text
 * @param text Text to process
 * @param query Search query to highlight
 * @returns Array of text parts with highlights
 */
export function highlightText(text: string, query: string): string[] {
  if (!query) return [text];
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.split(regex);
}

/**
 * Escape special characters in regex pattern
 * @param string String to escape
 * @returns Escaped string safe for regex
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Search professionals based on query
 * @param professionals Array of professionals to search
 * @param query Search query
 * @returns Filtered array of professionals
 */
export function searchProfessionals(
  professionals: Professional[],
  query: string
): Professional[] {
  if (!query) return professionals;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return professionals.filter(professional => {
    const searchableText = [
      professional.name,
      professional.title,
      professional.bio,
      professional.location,
      ...professional.specialties,
      ...professional.verifications,
      professional.gender
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}