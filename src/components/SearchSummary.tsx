import { findRelevantSpecialties } from '../utils/semanticSearch';

interface Props {
  searchQuery: string;
  resultCount: number;
}

export default function SearchSummary({ searchQuery, resultCount }: Props) {
  if (!searchQuery) return null;

  const relevantSpecialties = findRelevantSpecialties(searchQuery);
  
  return (
    <div className="mb-6 bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300">
            Showing results for: <span className="text-white font-semibold">"{searchQuery}"</span>
          </p>
          {relevantSpecialties.length > 0 && (
            <p className="text-gray-400 text-sm mt-1">
              Related specialties: {relevantSpecialties.map((specialty, index) => (
                <span key={specialty}>
                  <span className="text-purple-400">{specialty}</span>
                  {index < relevantSpecialties.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>
        <p className="text-gray-400 text-sm">
          {resultCount} {resultCount === 1 ? 'professional' : 'professionals'} found
        </p>
      </div>
    </div>
  );
}