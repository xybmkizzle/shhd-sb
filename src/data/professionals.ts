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
  {
    id: '2',
    name: 'Dr. James Chen',
    title: 'Marriage and Family Therapist',
    location: 'San Francisco, California',
    specialties: ['Relationships', 'Family Dynamics', 'Cultural Identity', 'Work-Life Balance'],
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296',
    bio: 'As a relationship expert with a multicultural background, I help couples and families build stronger connections while navigating cultural differences. I offer a safe space for exploring identity and improving communication.',
    verifications: [
      'Vetted by the Safe Haven Team',
      'AAPI community specialist',
      'Certified Gottman Method Therapist'
    ],
    sessionTypes: ['Virtual', 'In-person'],
    rating: 4.8,
    reviewCount: 98,
    gender: 'Male'
  },
  {
    id: '3',
    name: 'Dr. Sarah Martinez',
    title: 'LGBTQ+ Affirming Therapist',
    location: 'Austin, Texas',
    specialties: ['LGBTQ+ Issues', 'Self-Care', 'Stress Management', 'Cultural Identity'],
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
    bio: 'I provide affirming therapy for the LGBTQ+ community, focusing on identity exploration, coming out support, and relationship guidance. My practice is grounded in intersectional understanding and trauma-informed care.',
    verifications: [
      'Vetted by the Safe Haven Team',
      'LGBTQ+ Certified Therapist',
      'Gender-Affirming Care Specialist'
    ],
    sessionTypes: ['Virtual'],
    rating: 5.0,
    reviewCount: 87,
    gender: 'Non-binary'
  }
];