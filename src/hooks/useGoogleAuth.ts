/**
 * Custom hook for handling Google OAuth authentication
 */

import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { isUsingDevelopmentConfig } from '../config/google';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = isUsingDevelopmentConfig();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google OAuth success:', tokenResponse);
      return tokenResponse;
    },
    onError: (errorResponse) => {
      console.error('Google OAuth error:', errorResponse);
      setError('Failed to connect to Google Calendar');
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events',
    flow: 'implicit'
  });

  const handleLogin = useCallback(async (): Promise<TokenResponse | null> => {
    if (isDevelopment) {
      console.warn('Development mode: Google Calendar integration is disabled');
      return null;
    }

    try {
      setError(null);
      const response = await login();
      console.log('Google OAuth response:', response);
      return response as TokenResponse;
    } catch (err) {
      console.error('OAuth login error:', err);
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