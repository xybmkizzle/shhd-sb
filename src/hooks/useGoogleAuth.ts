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
    onSuccess: (tokenResponse) => {
      // Clear any previous errors on successful login
      setError(null);
    },
    onError: (errorResponse) => {
      setError(errorResponse?.error_description || 'Failed to connect to Google Calendar');
    },
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly',
    flow: 'implicit',
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Google Calendar';
      setError(errorMessage);
      return null;
    }
  }, [isDevelopment, login]);

  return {
    login: handleLogin,
    error,
    isDevelopment,
  };
}