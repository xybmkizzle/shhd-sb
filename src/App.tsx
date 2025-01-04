/**
 * Main application component that sets up routing and providers
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Directory from './pages/Directory';
import ProfessionalProfile from './pages/ProfessionalProfile';
import ProfessionalOnboarding from './pages/ProfessionalOnboarding';
import Header from './components/Header';
import { GoogleAuthProvider } from './providers/GoogleAuthProvider';

export default function App() {
  return (
    <GoogleAuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
            <Route path="/onboarding" element={<ProfessionalOnboarding />} />
          </Routes>
        </div>
      </Router>
    </GoogleAuthProvider>
  );
}