/**
 * Calendar component for booking appointments
 * Handles date selection, time slot display, and Google Calendar integration
 * Shows available slots based on professional's schedule and Google Calendar
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfToday } from 'date-fns';
import TimeSlotList from './TimeSlotList';
import { isDayAvailable } from '../../utils/availabilityService';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onTimeSelected: (time: string) => void;
  accessToken?: string;
}

export default function Calendar({ selectedDate, onDateChange, onTimeSelected, accessToken }: CalendarProps) {
  // Track the currently displayed month
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate));
  const today = startOfToday();
  
  // Generate array of days for the current month
  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Month navigation handlers
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  // Generate classes for calendar day cells
  const getDayClasses = (day: Date) => {
    const isPast = isBefore(day, today);
    const isAvailable = !isPast && isDayAvailable(day);
    
    return `
      w-10 h-10 rounded-full flex items-center justify-center text-sm relative
      ${!isSameMonth(day, currentMonth) ? 'text-gray-600' : 'text-gray-300'}
      ${isPast ? 'text-gray-600' : ''}
      ${isSameDay(day, selectedDate) ? 'bg-purple-600 text-white' : ''}
      ${isToday(day) ? 'border border-purple-400' : ''}
      ${isAvailable && !isSameDay(day, selectedDate) ? 'hover:bg-[#191919] cursor-pointer' : ''}
      ${!isAvailable || isPast ? 'cursor-not-allowed' : ''}
    `;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Calendar grid */}
      <div className="w-full md:w-96 bg-[#191919] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={prevMonth} 
            disabled={isBefore(startOfMonth(currentMonth), startOfMonth(today))}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold text-gray-200">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded-full text-gray-300">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map(day => {
            const isPast = isBefore(day, today);
            const isAvailable = !isPast && isDayAvailable(day);
            
            return (
              <button
                key={day.toString()}
                onClick={() => isAvailable && onDateChange(day)}
                disabled={!isSameMonth(day, currentMonth) || !isAvailable || isPast}
                className={getDayClasses(day)}
              >
                {format(day, 'd')}
                {/* Availability indicator dot */}
                {isAvailable && isSameMonth(day, currentMonth) && !isPast && (
                  <span className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slot selection */}
      <div className="flex-1 bg-[#191919] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-6">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h3>
        <TimeSlotList 
          selectedDate={selectedDate}
          onTimeSelected={onTimeSelected}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
}