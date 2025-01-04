/**
 * Provider component for Google Calendar functionality
 * Manages OAuth state and provides calendar context
 */

import { createContext, useContext, ReactNode } from 'react';
import { isUsingDevelopmentConfig } from '../../config/google';

interface GoogleCalendarContextType {
  isAvailable: boolean;
}

const GoogleCalendarContext = createContext<GoogleCalendarContextType>({
  isAvailable: false
});

interface Props {
  children: ReactNode;
}

export function GoogleCalendarProvider({ children }: Props) {
  const isAvailable = !isUsingDevelopmentConfig();

  return (
    <GoogleCalendarContext.Provider value={{ isAvailable }}>
      {children}
    </GoogleCalendarContext.Provider>
  );
}

export function useGoogleCalendar() {
  return useContext(GoogleCalendarContext);
}