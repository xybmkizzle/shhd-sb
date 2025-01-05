/**
 * Basic information form step
 */

import { ChangeEvent } from 'react';
import { ProfessionalFormData } from '../../../types';
import ImageUpload from '../components/ImageUpload';

interface Props {
  data: ProfessionalFormData;
  onUpdate: (data: Partial<ProfessionalFormData>) => void;
}

export default function BasicInfo({ data, onUpdate }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const inputClasses = "w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors";

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Profile Photo
        </label>
        <ImageUpload
          currentImage={data.imageUrl}
          onImageSelected={(url) => onUpdate({ imageUrl: url })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Professional Title
        </label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Session Rate (USD)
        </label>
        <input
          type="number"
          name="rate"
          value={data.rate}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>
    </div>
  );
}