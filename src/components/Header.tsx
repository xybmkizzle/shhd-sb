/**
 * Main application header component
 * Contains logo and professional signup button
 */
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#111' }} className="text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          
          {/* Professional signup button */}
          <Link
            to="/onboarding"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Join as Professional
          </Link>
        </div>
      </div>
    </header>
  );
}