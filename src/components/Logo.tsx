/**
 * Logo component for Safe Haven
 * Renders the official Safe Haven logo image
 */

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="https://github.com/xybmkizzle/shhd-sb/blob/5c36c222d24c3b295d87abb6c72d1a7849b32353/src/assets/logos/SAFE%20HAVEN%20Logo.png?raw=true"
      alt="Safe Haven"
      className={`h-8 w-auto ${className}`}
      onError={(e) => {
        console.error('Failed to load logo:', e);
        e.currentTarget.style.display = 'none';
      }}
    />
  );
}