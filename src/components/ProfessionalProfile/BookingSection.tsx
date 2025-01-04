/**
 * Booking section component for professional profiles
 * Handles session booking with calendar integration
 */

import { useState } from 'react';
import { format } from 'date-fns';
import Calendar from '../Calendar/Calendar';
import { Professional } from '../../types';

interface Props {
  professional: Professional;
  onBookSession: (date: string, time: string) => void;
}

export default function BookingSection({ professional, onBookSession }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Handle time slot selection
  const handleTimeSelected = (time: string) => {
    onBookSession(format(selectedDate, 'yyyy-MM-dd'), time);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Book a Session</h2>
      <Calendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onTimeSelected={handleTimeSelected}
        accessToken={undefined}
      />
    </div>
  );
}