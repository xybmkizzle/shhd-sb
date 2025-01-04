/**
 * Footer component with legal links and information
 * Displays terms and privacy policy links
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111' }} className="text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-center text-gray-300">
          By using this service, you agree to our{' '}
          <Link to="/terms" className="text-purple-400 hover:text-purple-300">Terms and Conditions</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>.
        </p>
      </div>
    </footer>
  );
}