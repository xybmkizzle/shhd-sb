/**
 * Service for managing professional availability and time slots
 * Handles calendar availability checks and time slot generation
 */

import { WeeklyAvailability, TimeSlot } from '../types/availability';
import { format, parse, isSameDay, isWithinInterval, addMinutes } from 'date-fns';

// Mock weekly availability schedule (would be fetched from backend in production)
const MOCK_AVAILABILITY: WeeklyAvailability[] = [
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }, // Monday
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' }, // Tuesday
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }, // Wednesday
  { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' }, // Thursday
  { dayOfWeek: 5, startTime: '09:00', endTime: '15:00' }, // Friday
];

/**
 * Check if a given date has any available time slots
 * @param date The date to check
 * @returns boolean indicating if the date has available slots
 */
export function isDayAvailable(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return MOCK_AVAILABILITY.some(slot => slot.dayOfWeek === dayOfWeek);
}

/**
 * Generate available time slots for a specific date
 * @param date The date to generate slots for
 * @returns Array of time slots with availability status
 */
export function getAvailableTimeSlotsForDay(date: Date): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const dayAvailability = MOCK_AVAILABILITY.find(slot => slot.dayOfWeek === dayOfWeek);
  
  if (!dayAvailability) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const startTime = parse(dayAvailability.startTime, 'HH:mm', date);
  const endTime = parse(dayAvailability.endTime, 'HH:mm', date);
  let currentSlot = startTime;

  // Generate 30-minute slots within available hours
  while (currentSlot < endTime) {
    slots.push({
      time: format(currentSlot, 'h:mm a'),
      available: true // Would check against actual bookings in production
    });
    currentSlot = addMinutes(currentSlot, 30);
  }

  return slots;
}