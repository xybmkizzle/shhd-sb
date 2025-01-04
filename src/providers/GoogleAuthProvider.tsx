/**
 * Provider component for Google authentication
 * Wraps Google OAuth provider with development mode handling
 */

import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID, isUsingDevelopmentConfig } from '../config/google';

interface Props {
  children: ReactNode;
}

export function GoogleAuthProvider({ children }: Props) {
  // In development mode without credentials, render children without provider
  if (isUsingDevelopmentConfig()) {
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}