/**
 * Basic information form step
 * Collects core professional details like name, title, and bio
 */

import { ChangeEvent } from 'react';
import { ProfessionalFormData } from '../../../types';
import ImageUpload from '../components/ImageUpload';

interface Props {
  data: ProfessionalFormData;
  onUpdate: (data: Partial<ProfessionalFormData>) => void;
}

export default function BasicInfo({ data, onUpdate }: Props) {
  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Profile photo upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <ImageUpload
          currentImage={data.imageUrl}
          onImageSelected={(url) => onUpdate({ imageUrl: url })}
        />
      </div>

      {/* Basic information form fields */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Title
        </label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={data.bio}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Rate (USD)
        </label>
        <input
          type="number"
          name="rate"
          value={data.rate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          required
        />
      </div>
    </div>
  );
}