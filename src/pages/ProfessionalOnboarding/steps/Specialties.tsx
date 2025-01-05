/**
 * Specialties selection step
 */

import { ProfessionalFormData } from '../../../types';
import { SPECIALTIES, SESSION_TYPES } from '../../../constants';

interface Props {
  data: ProfessionalFormData;
  onUpdate: (data: Partial<ProfessionalFormData>) => void;
}

export default function Specialties({ data, onUpdate }: Props) {
  const toggleSpecialty = (specialty: string) => {
    const updated = data.specialties.includes(specialty)
      ? data.specialties.filter(s => s !== specialty)
      : [...data.specialties, specialty];
    onUpdate({ specialties: updated });
  };

  const toggleSessionType = (type: string) => {
    const updated = data.sessionTypes.includes(type)
      ? data.sessionTypes.filter(t => t !== type)
      : [...data.sessionTypes, type];
    onUpdate({ sessionTypes: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">Areas of Expertise</h3>
        <div className="grid grid-cols-2 gap-3">
          {SPECIALTIES.map((specialty) => (
            <button
              key={specialty}
              onClick={() => toggleSpecialty(specialty)}
              className={`p-3 rounded-lg text-left transition-colors ${
                data.specialties.includes(specialty)
                  ? 'bg-purple-900/30 text-purple-200 border-2 border-purple-500'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">Session Types</h3>
        <div className="flex gap-4">
          {SESSION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => toggleSessionType(type)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                data.sessionTypes.includes(type)
                  ? 'bg-purple-900/30 text-purple-200 border-2 border-purple-500'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
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