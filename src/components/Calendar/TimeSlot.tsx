/**
 * Individual time slot component
 * Displays a single bookable time slot with availability status
 */

interface TimeSlotProps {
  isAvailable: boolean;
  onClick: () => void;
}

export default function TimeSlot({ isAvailable, onClick }: TimeSlotProps) {
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`
        w-full h-8 rounded-md transition-colors
        ${isAvailable 
          ? 'bg-purple-900 hover:bg-purple-800 cursor-pointer' 
          : 'bg-gray-800 cursor-not-allowed'}
      `}
    />
  );
}