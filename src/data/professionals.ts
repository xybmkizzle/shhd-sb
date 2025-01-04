/**
 * Mock professional data
 * Contains sample professional profiles for development
 */

import { Professional } from '../types';

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Maya Thompson',
    title: 'Licensed Clinical Psychologist',
    location: 'Atlanta, Georgia',
    specialties: ['Anxiety', 'Depression', 'Trauma', 'BIPOC Mental Health'],
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e',
    bio: 'With over 15 years of experience, I specialize in helping individuals navigate life transitions, manage anxiety, and overcome trauma. My approach combines cognitive-behavioral therapy with culturally responsive care.',
    verifications: [
      'Vetted by the Safe Haven Team',
      'Black men competent: 25+ years'
    ],
    sessionTypes: ['Virtual', 'In-person'],
    rating: 4.9,
    reviewCount: 124,
    gender: 'Female'
  },
  // Additional professionals...
];