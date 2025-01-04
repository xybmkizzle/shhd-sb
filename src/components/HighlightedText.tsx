/**
 * Component for highlighting search terms within text
 * Used to emphasize matching search terms in professional listings
 */

interface HighlightedTextProps {
  text: string;
  searchQuery: string;
  className?: string;
}

export default function HighlightedText({ text, searchQuery, className = '' }: HighlightedTextProps) {
  // Return plain text if no search query
  if (!searchQuery) return <span className={className}>{text}</span>;

  // Split text by search query and highlight matches
  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, i) => (
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <mark key={i} className="bg-purple-900 text-purple-100 rounded px-1">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </span>
  );
}