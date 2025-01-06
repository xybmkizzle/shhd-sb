/**
 * Custom hook for handling Google OAuth authentication
 */
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { isUsingDevelopmentConfig } from '../config/google';

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = isUsingDevelopmentConfig();

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events',
    flow: 'implicit',
    onError: (errorResponse) => {
      console.error('Google OAuth error:', errorResponse);
      setError('Failed to connect to Google Calendar');
    }
  });

  const login = async () => {
    if (isDevelopment) {
      console.warn('Development mode: Google Calendar integration is disabled');
      return null;
    }

    try {
      setError(null);
      const response = await googleLogin();
      console.log('Google OAuth response:', response);
      return response;
    } catch (err) {
      console.error('OAuth login error:', err);
      setError('Failed to connect to Google Calendar');
      return null;
    }
  };

  return {
    login,
    error,
    isDevelopment,
  };
}