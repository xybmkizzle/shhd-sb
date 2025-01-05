/**
 * Availability management step
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
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [accessToken, setAccessToken] = useState<string>();
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);

  const handleCalendarConnect = (token: string) => {
    setAccessToken(token);
    setIsCalendarConnected(true);
    onUpdate({ googleCalendarConnected: true });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">
          Connect Your Calendar
        </h3>
        <p className="text-gray-400 mb-4">
          Connect your Google Calendar to automatically sync your availability and prevent double bookings.
        </p>
        <GoogleCalendarConnect
          onConnect={handleCalendarConnect}
          isConnected={isCalendarConnected}
        />
      </div>

      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onTimeSelected={() => {}}
        accessToken={accessToken}
      />
    </div>
  );
}