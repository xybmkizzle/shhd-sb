/**
 * Custom hook for handling Google OAuth authentication
 */
import { useState, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export function useGoogleAuth() {
  const [error, setError] = useState<string | null>(null);
  const isDevelopment = !import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    onSuccess: tokenResponse => {
      return tokenResponse.access_token;
    },
    onError: () => {
      setError('Failed to connect to Google Calendar');
    },
    flow: 'implicit'
  });

  const handleLogin = useCallback(async () => {
    if (isDevelopment) return null;

    try {
      setError(null);
      const result = await login();
      return result.access_token;
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