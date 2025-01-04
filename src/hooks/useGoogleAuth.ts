/**
 * Custom hook for handling Google OAuth authentication
 * Manages OAuth flow and error handling for calendar integration
 */

import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { isUsingDevelopmentConfig } from '../config/google';

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = isUsingDevelopmentConfig();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setError(null);
      return tokenResponse;
    },
    onError: (errorResponse) => {
      setError(errorResponse?.error_description || 'Failed to connect to Google Calendar');
    },
    scope: 'https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly',
    flow: 'auth-code',
    onNonOAuthError: (err) => {
      setError(err.message || 'An unexpected error occurred');
    }
  });

  const handleLogin = useCallback(async () => {
    if (isDevelopment) {
      return null;
    }

    try {
      setError(null);
      const tokenResponse = await login();
      return tokenResponse.access_token;
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