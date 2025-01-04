/**
 * Component for connecting to Google Calendar
 * Handles OAuth flow and displays connection status
 * Falls back gracefully when credentials aren't configured
 */

import { Calendar } from 'lucide-react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

interface Props {
  onConnect: (token: string) => void;
  isConnected: boolean;
}

export default function GoogleCalendarConnect({ onConnect, isConnected }: Props) {
  const { login, error, isDevelopment } = useGoogleAuth();

  const handleConnect = async () => {
    const token = await login();
    if (token) {
      onConnect(token);
    }
  };

  if (isDevelopment) {
    return (
      <div className="mb-6">
        <button
          disabled
          className="flex items-center px-4 py-2 rounded-lg border border-gray-700 text-gray-500 cursor-not-allowed"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Google Calendar (Development Mode)
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Google Calendar integration is disabled in development mode.
          Configure Google OAuth credentials to enable this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleConnect}
        className={`flex items-center px-4 py-2 rounded-lg border ${
          isConnected
            ? 'bg-green-900/50 border-green-700 text-green-200'
            : 'bg-gray-900 border-gray-700 text-gray-200 hover:bg-gray-800'
        }`}
      >
        <Calendar className="w-5 h-5 mr-2" />
        {isConnected ? 'Google Calendar Connected' : 'Connect Google Calendar'}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}