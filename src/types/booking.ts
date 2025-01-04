/**
 * Type definitions for booking functionality
 * Defines structures for time slots and booking data
 */

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface BookingSlots {
  [date: string]: TimeSlot[];
}