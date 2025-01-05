/**
 * Component for connecting to Google Calendar
 */
import { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

interface Props {
  onConnect: (token: string) => void;
  isConnected: boolean;
}

export default function GoogleCalendarConnect({ onConnect, isConnected }: Props) {
  const { login, isDevelopment } = useGoogleAuth();
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const response = await login();
      if (response?.access_token) {
        onConnect(response.access_token);
      } else {
        setError('Failed to connect to Google Calendar');
      }
    } catch (err) {
      setError('Failed to connect to Google Calendar');
    } finally {
      setIsConnecting(false);
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
          Configure Google OAuth credentials to enable calendar integration.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleConnect}
        disabled={isConnected || isConnecting}
        className={`
          flex items-center px-4 py-2 rounded-lg border transition-colors
          ${isConnected
            ? 'bg-green-900/20 border-green-600 text-green-400'
            : 'border-gray-700 text-gray-200 hover:bg-gray-800'
          }
          ${isConnecting ? 'opacity-50 cursor-wait' : ''}
        `}
      >
        {isConnected ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Calendar Connected
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect Google Calendar'}
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}