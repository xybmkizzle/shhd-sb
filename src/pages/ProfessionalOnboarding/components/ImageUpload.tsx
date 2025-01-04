/**
 * Image upload component for professional profiles
 * Handles profile photo selection and preview
 * Note: In production, would integrate with actual file upload service
 */

interface Props {
  currentImage: string;
  onImageSelected: (url: string) => void;
}

export default function ImageUpload({ currentImage, onImageSelected }: Props) {
  // In a real app, this would handle file upload to a storage service
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload by using a placeholder image
      onImageSelected('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e');
    }
  };

  return (
    <div className="flex items-center space-x-6">
      {/* Image preview */}
      <div className="w-32 h-32 relative">
        <img
          src={currentImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
        {/* Upload button */}
        <label
          htmlFor="photo-upload"
          className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </label>
        <input
          id="photo-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {/* Upload instructions */}
      <div className="flex-1">
        <p className="text-sm text-gray-500">
          Upload a professional photo for your profile.
          <br />
          Recommended: A clear headshot with good lighting.
        </p>
      </div>
    </div>
  );
}