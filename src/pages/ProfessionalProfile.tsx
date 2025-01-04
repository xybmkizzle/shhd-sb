/**
 * Individual professional profile page
 * Displays detailed information and booking interface
 */

import { useParams } from 'react-router-dom';
import { professionals } from '../data/professionals';
import ProfileHeader from '../components/ProfessionalProfile/ProfileHeader';
import BookingSection from '../components/ProfessionalProfile/BookingSection';

export default function ProfessionalProfile() {
  const { id } = useParams();
  const professional = professionals.find(p => p.id === id);

  // Handle non-existent professional profiles
  if (!professional) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Professional not found</div>;
  }

  /**
   * Handle session booking
   * Would integrate with booking system in production
   */
  const handleBookSession = (date: string, time: string) => {
    // Placeholder for booking functionality
    alert(`Booking session with ${professional.name} on ${date} at ${time}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111' }}>
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Professional profile header */}
        <ProfileHeader professional={professional} />
        
        {/* Booking calendar and interface */}
        <BookingSection 
          professional={professional}
          onBookSession={handleBookSession}
        />
      </main>
    </div>
  );
}