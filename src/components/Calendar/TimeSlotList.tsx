/**
 * Component for displaying available time slots
 * Integrates with Google Calendar to show real-time availability
 */

import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { getAvailableTimeSlotsForDay } from '../../utils/availabilityService';
import { getGoogleCalendarSlots } from '../../utils/calendarIntegration';
import { TimeSlot } from '../../types/availability';

interface TimeSlotListProps {
  selectedDate: Date;
  onTimeSelected: (time: string) => void;
  accessToken?: string;
}

export default function TimeSlotList({ selectedDate, onTimeSelected, accessToken }: TimeSlotListProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      setIsLoading(true);
      setError(null);
      
      try {
        const baseSlots = getAvailableTimeSlotsForDay(selectedDate);
        const availableSlots = await getGoogleCalendarSlots(accessToken, selectedDate, baseSlots);
        setTimeSlots(availableSlots);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load availability');
        setTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSlots();
    setSelectedTime(null);
  }, [selectedDate, accessToken]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelected(time);
  };

  if (isLoading) {
    return (
      <div className="text-gray-300 text-center py-8">
        Loading available times...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-200">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Error loading availability</span>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="text-gray-300 text-center py-8">
        No available time slots for this day
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-gray-300 mb-4">Select a time</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {timeSlots.map(({ time, available }) => (
          <button
            key={time}
            onClick={() => available && handleTimeSelect(time)}
            disabled={!available}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${available 
                ? selectedTime === time
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#191919] text-gray-200 hover:bg-gray-800'
                : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}