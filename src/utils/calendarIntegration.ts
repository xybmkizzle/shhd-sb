/**
 * Google Calendar integration service
 */
import { TimeSlot } from '../types/availability';
import { format, parse, addMinutes } from 'date-fns';

interface CalendarEvent {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export async function getGoogleCalendarSlots(
  accessToken: string | undefined,
  date: Date,
  baseSlots: TimeSlot[]
): Promise<TimeSlot[]> {
  if (!accessToken) return baseSlots;

  try {
    const timeMin = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const timeMax = new Date(date.setHours(23, 59, 59, 999)).toISOString();
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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

    return baseSlots.map(slot => {
      const slotStart = parse(slot.time, 'h:mm a', date);
      const slotEnd = addMinutes(slotStart, 30);

      const isSlotBusy = events.some(event => {
        if (event.start.dateTime && event.end.dateTime) {
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          return slotStart < eventEnd && slotEnd > eventStart;
        }
        return false;
      });

      return {
        ...slot,
        available: slot.available && !isSlotBusy
      };
    });
  } catch (error) {
    console.error('Calendar integration error:', error);
    throw error;
  }
}