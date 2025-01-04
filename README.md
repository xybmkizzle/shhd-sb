# Safe Haven Healers

A mental health professional booking platform that connects clients with therapists and counselors. The platform features a sophisticated search system, calendar integration, and a seamless booking experience.

## Features

- Advanced semantic search for finding mental health professionals
- Google Calendar integration for availability management
- Real-time booking system
- Professional profiles with specialties and verifications
- Responsive design optimized for all devices
- Dark mode interface

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google OAuth/Calendar API
- Lucide React Icons

## Project Structure

### Core Application Files

- `src/App.tsx` - Main application component and routing setup
- `src/main.tsx` - Application entry point
- `vite.config.ts` - Vite configuration with OAuth port settings
- `tailwind.config.js` - Tailwind CSS customization
- `.env` - Environment variables for Google OAuth

### Components

#### Calendar System
- `src/components/Calendar/Calendar.tsx` - Main calendar component with date selection
- `src/components/Calendar/TimeSlotList.tsx` - Available time slots display
- `src/components/Calendar/GoogleCalendarConnect.tsx` - Google Calendar integration UI

#### Professional Profiles
- `src/components/ProfessionalCard.tsx` - Card display for professional listings
- `src/components/ProfessionalProfile/ProfileHeader.tsx` - Professional profile header
- `src/components/ProfessionalProfile/BookingSection.tsx` - Session booking interface

#### Search and Filtering
- `src/components/SearchFilters.tsx` - Search and filtering interface
- `src/components/SearchResults.tsx` - Search results display
- `src/components/SearchSummary.tsx` - Search results summary
- `src/components/Filters.tsx` - Filter options component

#### Layout Components
- `src/components/Header.tsx` - Application header with navigation
- `src/components/Footer.tsx` - Application footer
- `src/components/HighlightedText.tsx` - Text highlighting utility component

### Pages

- `src/pages/Directory.tsx` - Main professional directory page
- `src/pages/ProfessionalProfile.tsx` - Individual professional profile page
- `src/pages/ProfessionalOnboarding/` - Professional onboarding flow

### Utilities

- `src/utils/availabilityService.ts` - Availability management logic
- `src/utils/calendarIntegration.ts` - Google Calendar integration logic
- `src/utils/semanticSearch.ts` - Advanced search functionality
- `src/utils/filterUtils.ts` - Search filtering utilities
- `src/utils/dateUtils.ts` - Date manipulation utilities
- `src/utils/searchUtils.ts` - Search helper functions

### Types and Constants

- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants and configurations
- `src/config/` - Configuration files

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Google OAuth credentials
4. Start development server: `npm run dev`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Guidelines

1. Follow the existing file structure
2. Use TypeScript for all new files
3. Implement responsive design using Tailwind CSS
4. Follow the dark theme color scheme
5. Use Lucide React for icons
6. Maintain semantic search capabilities for new features

## Environment Variables

Required environment variables:

- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `VITE_GOOGLE_API_KEY` - Google API Key

## License

MIT License