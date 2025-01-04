/**
 * Semantic search implementation for finding relevant professionals
 * Handles natural language processing and matching of search terms
 * Maps common phrases and symptoms to professional specialties
 */

import { Professional } from '../types';

// Map common terms and phrases to relevant specialties
const SEMANTIC_MAPPINGS = {
  // Depression related terms and their corresponding specialties
  'depressed': ['Depression'],
  'feeling down': ['Depression'],
  'cant sleep': ['Depression', 'Anxiety'],
  'no motivation': ['Depression'],
  'sad': ['Depression'],
  'hopeless': ['Depression'],
  'lonely': ['Depression'],
  
  // Anxiety related mappings
  'anxious': ['Anxiety'],
  'worried': ['Anxiety'],
  'panic': ['Anxiety'],
  'stress': ['Anxiety', 'Stress Management'],
  'overthinking': ['Anxiety'],
  'nervous': ['Anxiety'],
  'fear': ['Anxiety', 'Trauma'],
  
  // Relationship related mappings
  'relationship': ['Relationships'],
  'marriage': ['Relationships'],
  'partner': ['Relationships'],
  'family': ['Family Dynamics'],
  'divorce': ['Relationships'],
  'dating': ['Relationships'],
  
  // Trauma related mappings
  'trauma': ['Trauma'],
  'ptsd': ['Trauma'],
  'abuse': ['Trauma'],
  'grief': ['Trauma'],
  'loss': ['Trauma'],
  
  // Work related mappings
  'work': ['Work-Life Balance', 'Stress Management'],
  'career': ['Work-Life Balance'],
  'burnout': ['Work-Life Balance', 'Stress Management'],
  'job': ['Work-Life Balance'],
  
  // Identity related mappings
  'identity': ['Cultural Identity', 'BIPOC Mental Health'],
  'culture': ['Cultural Identity'],
  'race': ['Cultural Identity', 'BIPOC Mental Health'],
  'discrimination': ['Cultural Identity', 'BIPOC Mental Health']
};

// Common phrases that indicate someone is seeking help
const INTENT_PHRASES = {
  'i feel': true,
  'i am': true,
  'im feeling': true,
  'ive been': true,
  'dealing with': true,
  'struggling with': true,
  'need help': true,
  'looking for': true
};

// Find relevant specialties based on search query
export function findRelevantSpecialties(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/);
  const relevantSpecialties = new Set<string>();

  // Remove intent phrases to focus on symptoms/concerns
  for (const phrase of Object.keys(INTENT_PHRASES)) {
    if (query.toLowerCase().includes(phrase)) {
      query = query.toLowerCase().replace(phrase, '').trim();
      break;
    }
  }

  // Check words and phrases against mappings
  words.forEach((word, index) => {
    if (SEMANTIC_MAPPINGS[word]) {
      SEMANTIC_MAPPINGS[word].forEach(specialty => relevantSpecialties.add(specialty));
    }

    // Check two-word combinations
    if (index < words.length - 1) {
      const twoWordPhrase = `${word} ${words[index + 1]}`;
      if (SEMANTIC_MAPPINGS[twoWordPhrase]) {
        SEMANTIC_MAPPINGS[twoWordPhrase].forEach(specialty => 
          relevantSpecialties.add(specialty)
        );
      }
    }
  });

  return Array.from(relevantSpecialties);
}

// Generate search suggestions based on query
export function getSuggestedSearches(query: string): string[] {
  const suggestions: string[] = [];
  const queryWords = query.toLowerCase().split(/\s+/);

  // Find similar terms in mappings
  for (const [key, specialties] of Object.entries(SEMANTIC_MAPPINGS)) {
    if (queryWords.some(word => 
      key.includes(word) || 
      word.includes(key) ||
      levenshteinDistance(word, key) <= 2
    )) {
      suggestions.push(
        `Help with ${key}`,
        `${specialties[0]} specialist`
      );
    }
  }

  // Add suggestions based on most relevant specialty
  const relevantSpecialties = findRelevantSpecialties(query);
  if (relevantSpecialties.length > 0) {
    suggestions.push(
      `${relevantSpecialties[0]} therapist`,
      `Help with ${relevantSpecialties[0].toLowerCase()}`
    );
  }

  return [...new Set(suggestions)].slice(0, 5);
}

// Calculate string similarity using Levenshtein distance
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1).fill(null).map(() => 
    Array(a.length + 1).fill(null)
  );

  for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + substitutionCost
      );
    }
  }

  return matrix[b.length][a.length];
}

// Main semantic search function
export function semanticSearch(
  professionals: Professional[],
  query: string
): Professional[] {
  if (!query) return professionals;

  const relevantSpecialties = findRelevantSpecialties(query);
  const queryTerms = query.toLowerCase().split(/\s+/);

  return professionals.filter(professional => {
    // Check specialty matches
    const hasRelevantSpecialty = relevantSpecialties.some(specialty =>
      professional.specialties.includes(specialty)
    );

    // Check other field matches
    const searchableText = [
      professional.name,
      professional.title,
      professional.bio,
      ...professional.specialties,
      ...professional.verifications
    ].join(' ').toLowerCase();

    const matchesQueryTerms = queryTerms.some(term => 
      searchableText.includes(term)
    );

    return hasRelevantSpecialty || matchesQueryTerms;
  });
}