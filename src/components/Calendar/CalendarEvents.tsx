/**
 * Component to display Google Calendar events for selected date
 */
import { useEffect, useState } from 'react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

interface Props {
  selectedDate: Date;
  accessToken?: string;
}

export default function CalendarEvents({ selectedDate, accessToken }: Props) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      if (!accessToken) return;
      
      setIsLoading(true);
      setError(null);

      try {
        const timeMin = startOfDay(selectedDate).toISOString();
        const timeMax = endOfDay(selectedDate).toISOString();
        
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
          throw new Error(errorData.error?.message || 'Failed to fetch calendar events');
        }

        const data = await response.json();
        setEvents(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [selectedDate, accessToken]);

  if (isLoading) {
    return (
      <div className="text-gray-300 animate-pulse">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        Error loading events: {error}
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="text-gray-400 italic">
        Connect your Google Calendar to view events
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-gray-400">
        No events scheduled for {format(selectedDate, 'MMMM d, yyyy')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Events for {format(selectedDate, 'MMMM d, yyyy')}
      </h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <h4 className="font-medium text-white mb-2">{event.summary}</h4>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {event.start.dateTime ? (
                <span>
                  {format(new Date(event.start.dateTime), 'h:mm a')} -{' '}
                  {format(new Date(event.end.dateTime!), 'h:mm a')}
                </span>
              ) : (
                <span>All day</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}