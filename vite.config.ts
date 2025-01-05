/**
 * Vite configuration for the application
 * - Configures React plugin
 * - Excludes lucide-react from optimization
 * - Sets up development server for OAuth compatibility
 * - Forces port 5173 for OAuth redirect
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // Force specific port for OAuth
    strictPort: true, // Don't try other ports if 5173 is taken
  },
});