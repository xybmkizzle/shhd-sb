/**
 * Specialties selection step
 * Allows professionals to select their areas of expertise and session types
 */

import { ProfessionalFormData } from '../../../types';
import { SPECIALTIES, SESSION_TYPES } from '../../../constants';

interface Props {
  data: ProfessionalFormData;
  onUpdate: (data: Partial<ProfessionalFormData>) => void;
}

export default function Specialties({ data, onUpdate }: Props) {
  // Toggle specialty selection
  const toggleSpecialty = (specialty: string) => {
    const updated = data.specialties.includes(specialty)
      ? data.specialties.filter(s => s !== specialty)
      : [...data.specialties, specialty];
    onUpdate({ specialties: updated });
  };

  // Toggle session type selection
  const toggleSessionType = (type: string) => {
    const updated = data.sessionTypes.includes(type)
      ? data.sessionTypes.filter(t => t !== type)
      : [...data.sessionTypes, type];
    onUpdate({ sessionTypes: updated });
  };

  return (
    <div className="space-y-8">
      {/* Specialties selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Areas of Expertise</h3>
        <div className="grid grid-cols-2 gap-3">
          {SPECIALTIES.map((specialty) => (
            <button
              key={specialty}
              onClick={() => toggleSpecialty(specialty)}
              className={`p-3 rounded-lg text-left ${
                data.specialties.includes(specialty)
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-500'
                  : 'bg-gray-50 text-gray-700 border border-gray-300'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Session types selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Types</h3>
        <div className="flex gap-4">
          {SESSION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleSessionType(type)}
              className={`px-6 py-3 rounded-lg ${
                data.sessionTypes.includes(type)
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-500'
                  : 'bg-gray-50 text-gray-700 border border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}