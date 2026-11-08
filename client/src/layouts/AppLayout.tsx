import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';

export function AppLayout() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Header />

      <main className='bg-slate-50'>
        <Outlet />
      </main>

      <footer className='border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500'>
        Rent a Car - Alquiler de vehículos
      </footer>
    </div>
  );
}