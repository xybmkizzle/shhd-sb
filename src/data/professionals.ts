/**
 * Mock professional data
 */

import { Professional } from '../types';

export const professionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Maya Thompson',
    title: 'Licensed Clinical Psychologist',
    location: 'Atlanta, Georgia',
    specialties: ['Anxiety', 'Depression', 'Trauma', 'BIPOC Mental Health'],
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
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
    name: 'Dr. Marcus Johnson',
    title: 'Marriage and Family Therapist',
    location: 'Chicago, Illinois',
    specialties: ['Relationships', 'Family Dynamics', 'Cultural Identity', 'Work-Life Balance'],
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
    bio: 'As a relationship expert, I help couples and families build stronger connections while navigating life\'s challenges. I offer a safe space for exploring identity and improving communication.',
    verifications: [
      'Vetted by the Safe Haven Team',
      'Certified Gottman Method Therapist',
      'Black families specialist'
    ],
    sessionTypes: ['Virtual', 'In-person'],
    rating: 4.8,
    reviewCount: 98,
    gender: 'Male'
  },
  {
    id: '3',
    name: 'Dr. Jasmine Williams',
    title: 'Trauma-Informed Therapist',
    location: 'Washington, DC',
    specialties: ['Trauma', 'Self-Care', 'Stress Management', 'Cultural Identity'],
    imageUrl: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f',
    bio: 'I provide trauma-informed therapy focusing on healing, personal growth, and empowerment. My practice is grounded in cultural understanding and evidence-based care.',
    verifications: [
      'Vetted by the Safe Haven Team',
      'EMDR Certified',
      'Black women specialist'
    ],
    sessionTypes: ['Virtual'],
    rating: 5.0,
    reviewCount: 87,
    gender: 'Female'
  }
];