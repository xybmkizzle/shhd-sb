/**
 * Core type definitions for the application
 * Defines interfaces for professionals and filtering
 */

export interface Professional {
  id: string;
  name: string;
  title: string;
  location: string;
  imageUrl: string;
  bio: string;
  specialties: string[];
  verifications: string[];
  sessionTypes: string[];
  rating: number;
  reviewCount: number;
  gender: string;
}

export interface FilterOptions {
  specialty: string;
  sessionType: string;
  gender: string;
  community: string;
}