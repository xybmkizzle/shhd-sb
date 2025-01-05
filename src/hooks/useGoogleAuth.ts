/**
 * Custom hook for handling Google OAuth authentication
 */
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { isUsingDevelopmentConfig } from '../config/google';

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = isUsingDevelopmentConfig();

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: (response) => {
      return response.access_token;
    },
    onError: () => {
      setError('Failed to connect to Google Calendar');
    },
  });

  const handleLogin = useCallback(async () => {
    if (isDevelopment) {
      return null;
    }

    try {
      setError(null);
      const response = await login();
      return response.access_token;
    } catch (err) {
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