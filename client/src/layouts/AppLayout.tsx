import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function AppLayout() {
  const { isAuth, user } = useAuth();
  return (
    <div>
      <header className='w-full flex justify-between px-4 h-16 items-center'>
        <h3>Rent a Car</h3>

        <nav className='flex gap-4'>
          {
            isAuth ?
              <p className='bg-blue-600 text-white px-3 rounded'>Hola, {user?.username}</p>
              : <Link to="/auth" className='bg-blue-600 text-white px-3 rounded'>Comenzar</Link>}
          <Link to="/reservas">Reservas</Link>
          <Link to="/catalogo">Autos</Link>
          {/* <a href="">Reservar</a> */}
        </nav>
      </header>

      <main className='bg-slate-100'>
        <Outlet />
      </main>

      <footer>
        footer
      </footer>
    </div>
  );
}