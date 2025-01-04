/**
 * Type definitions for availability management
 * Defines structures for weekly schedules and time slots
 */

export interface WeeklyAvailability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface TimeSlot {
  time: string;
  available: boolean;
}