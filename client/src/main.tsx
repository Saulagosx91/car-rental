import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import DashboardRoutes from './routes/DashboardRoutes.tsx';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <DashboardRoutes />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
