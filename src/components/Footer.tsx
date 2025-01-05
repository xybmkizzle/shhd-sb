/**
 * Footer component with legal links and information
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111' }} className="text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-center text-gray-300">
          By using this service, you agree to our{' '}
          <a 
            href="https://www.expressyourselfblackman.com/terms-and-conditions" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-400 hover:text-purple-300"
          >
            Terms and Conditions
          </a>
          {' '}and{' '}
          <a 
            href="https://www.expressyourselfblackman.com/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-400 hover:text-purple-300"
          >
            Privacy Policy
          </a>.
        </p>
      </div>
    </footer>
  );
}