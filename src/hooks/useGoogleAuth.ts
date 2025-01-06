/**
 * Custom hook for handling Google OAuth authentication
 */
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

// Define required calendar scopes
const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
];

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = !import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const login = useCallback(() => {
    return new Promise((resolve, reject) => {
      useGoogleLogin({
        scope: CALENDAR_SCOPES.join(' '),
        flow: 'implicit',
        onSuccess: (response) => {
          console.log('Google OAuth success response:', response);
          if (response && response.access_token) {
            resolve(response);
          } else {
            reject(new Error('Access token is missing in the response'));
          }
        },
        onError: (errorResponse) => {
          console.error('Google OAuth error response:', errorResponse);
          reject(new Error('Failed to connect to Google Calendar'));
        },
      })();
    });
  }, []);

  const handleLogin = useCallback(async () => {
    if (isDevelopment) {
      console.warn('Development mode: Google Calendar integration is disabled');
      return null;
    }

    try {
      setError(null);
      console.log('Initiating Google OAuth login...');
      const response = await login();
      console.log('Google OAuth login response:', response);
      return response;
    } catch (err) {
      console.error('OAuth login error:', err);
      setError(err.message || 'Failed to connect to Google Calendar');
      return null;
    }
  }, [isDevelopment, login]);

  return {
    login: handleLogin,
    error,
    isDevelopment,
  };
}
