/**
 * Availability management step
 * Handles Google Calendar integration and availability settings
 */

import { useState } from 'react';
import { ProfessionalFormData } from '../../../types';
import GoogleCalendarConnect from '../../../components/Calendar/GoogleCalendarConnect';
import Calendar from '../../../components/Calendar/Calendar';

interface Props {
  data: ProfessionalFormData;
  onUpdate: (data: Partial<ProfessionalFormData>) => void;
}

export default function Availability({ data, onUpdate }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [accessToken, setAccessToken] = useState<string>();

  // Handle Google Calendar connection
  const handleCalendarConnect = (token: string) => {
    setAccessToken(token);
    onUpdate({ googleCalendarConnected: true });
  };

  return (
    <div className="space-y-6">
      {/* Google Calendar integration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Connect Your Calendar
        </h3>
        <p className="text-gray-600 mb-4">
          Connect your Google Calendar to automatically sync your availability and prevent double bookings.
        </p>
        <GoogleCalendarConnect
          onConnect={handleCalendarConnect}
          isConnected={!!accessToken}
        />
      </div>

      {/* Availability calendar */}
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        accessToken={accessToken}
      />
    </div>
  );
}