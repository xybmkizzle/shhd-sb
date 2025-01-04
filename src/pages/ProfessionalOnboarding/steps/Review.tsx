/**
 * Review step for professional onboarding
 * Displays summary of all entered information before submission
 */

import { ProfessionalFormData } from '../../../types';

interface Props {
  data: ProfessionalFormData;
}

export default function Review({ data }: Props) {
  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="flex items-center space-x-6">
        <img
          src={data.imageUrl || 'https://via.placeholder.com/150'}
          alt={data.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
          <p className="text-gray-600">{data.title}</p>
        </div>
      </div>

      {/* Bio section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">About</h3>
        <p className="text-gray-700">{data.bio}</p>
      </div>

      {/* Specialties section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {data.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Session types section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Session Types</h3>
        <div className="flex gap-4">
          {data.sessionTypes.map((type) => (
            <span
              key={type}
              className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Rate section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Rate</h3>
        <p className="text-gray-700">${data.rate} per session</p>
      </div>
    </div>
  );
}