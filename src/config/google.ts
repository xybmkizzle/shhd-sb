/**
 * Google OAuth configuration
 * Manages Google API credentials with fallbacks for development
 */

import { z } from 'zod';

// Schema for environment variables with optional values and validation
const envSchema = z.object({
  VITE_GOOGLE_CLIENT_ID: z.string().optional(),
  VITE_GOOGLE_API_KEY: z.string().optional(),
});

// Parse environment variables with fallbacks
const env = envSchema.safeParse({
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY,
});

// Provide safe defaults if parsing fails
export const GOOGLE_CLIENT_ID = env.success ? env.data.VITE_GOOGLE_CLIENT_ID : '';
export const GOOGLE_API_KEY = env.success ? env.data.VITE_GOOGLE_API_KEY : '';

// Helper to check if using development configuration
export const isUsingDevelopmentConfig = () => !GOOGLE_CLIENT_ID || !GOOGLE_API_KEY;