/**
 * Google Calendar integration utilities
 * Handles calendar API interactions and availability checking
 */

import { addMinutes, parseISO, format } from 'date-fns';

export interface CalendarEvent {
  start: string;
  end: string;
}

/**
 * Fetch available time slots from Google Calendar
 * @param accessToken Google OAuth access token
 * @param startDate Start of time range
 * @param endDate End of time range
 * @returns Array of available time slots
 */
export async function getAvailableSlots(
  accessToken: string,
  startDate: Date,
  endDate: Date
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/freeBusy`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString(),
          items: [{ id: 'primary' }],
        }),
      }
    );

    const data = await response.json();
    const busySlots = data.calendars.primary.busy;
    return generateAvailableSlots(startDate, endDate, busySlots);
  } catch (error) {
    console.error('Error fetching calendar availability:', error);
    return [];
  }
}

/**
 * Generate available time slots excluding busy periods
 * @param startDate Start of time range
 * @param endDate End of time range
 * @param busySlots Array of busy time periods
 * @returns Array of available time slots
 */
function generateAvailableSlots(
  startDate: Date,
  endDate: Date,
  busySlots: CalendarEvent[]
): string[] {
  const availableSlots: string[] = [];
  const slotDuration = 60; // 60 minutes per slot

  let currentSlot = new Date(startDate);
  while (currentSlot < endDate) {
    const slotEnd = addMinutes(currentSlot, slotDuration);
    
    const isAvailable = !busySlots.some(
      busy => 
        currentSlot < parseISO(busy.end) && 
        slotEnd > parseISO(busy.start)
    );

    if (isAvailable) {
      availableSlots.push(format(currentSlot, "yyyy-MM-dd'T'HH:mm:ss"));
    }

    currentSlot = slotEnd;
  }

  return availableSlots;
}