/**
 * Google Calendar integration service
 * Handles fetching and processing calendar availability
 */

import { TimeSlot } from '../types/availability';
import { format, parse, addMinutes, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { RRule } from 'rrule';

interface CalendarEvent {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  recurrence?: string[];
}

export async function getGoogleCalendarSlots(
  accessToken: string | undefined,
  date: Date,
  baseSlots: TimeSlot[]
): Promise<TimeSlot[]> {
  if (!accessToken) return baseSlots;

  try {
    // Get events for the selected date
    const timeMin = startOfDay(date).toISOString();
    const timeMax = endOfDay(date).toISOString();
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Calendar API error: ${response.status}`);
    }

    const data = await response.json();
    const events: CalendarEvent[] = data.items || [];

    // Update availability based on calendar events
    return baseSlots.map(slot => {
      const slotTime = parse(slot.time, 'h:mm a', date);
      const slotEnd = addMinutes(slotTime, 30);

      const isSlotBusy = events.some(event => {
        // Handle all-day events
        if (event.start.date && event.end.date) {
          const eventStart = new Date(event.start.date);
          const eventEnd = new Date(event.end.date);
          return isWithinInterval(slotTime, { start: eventStart, end: eventEnd });
        }

        // Handle regular events
        if (event.start.dateTime && event.end.dateTime) {
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          return slotTime < eventEnd && slotEnd > eventStart;
        }

        return false;
      });

      return {
        ...slot,
        available: slot.available && !isSlotBusy
      };
    });
  } catch (error) {
    console.error('Error fetching Google Calendar:', error);
    throw new Error('Failed to fetch calendar events. Please try again.');
  }
}