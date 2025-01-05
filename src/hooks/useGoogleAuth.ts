/**
 * Custom hook for handling Google OAuth authentication
 */
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

// Define required calendar scopes
const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events'
];

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = !import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const login = useGoogleLogin({
    scope: CALENDAR_SCOPES.join(' '),
    flow: 'implicit',
    onError: (errorResponse) => {
      console.error('Google OAuth error:', errorResponse);
      setError('Failed to connect to Google Calendar');
    }
  });

  const handleLogin = useCallback(async () => {
    if (isDevelopment) {
      console.warn('Development mode: Google Calendar integration is disabled');
      return null;
    }

    try {
      setError(null);
      const response = await login();
      return response;
    } catch (err) {
      console.error('OAuth error:', err);
      setError('Failed to connect to Google Calendar');
      return null;
    }
  }, [isDevelopment, login]);

  return {
    login: handleLogin,
    error,
    isDevelopment,
  };
}