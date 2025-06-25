import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </AnimatePresence>

  );
}
