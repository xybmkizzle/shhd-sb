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
      src="https://raw.githubusercontent.com/stackblitz/stackblitz-codeflow/main/docs/public/safe-haven-logo.png"
      alt="Safe Haven"
      className={`h-12 w-auto ${className}`}
    />
  );
}