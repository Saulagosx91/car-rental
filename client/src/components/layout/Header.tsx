import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { isAuth, user } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <Link to='/' className='flex items-center gap-2 text-xl font-bold text-slate-900'>
          <span className='grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white'>R</span>
          Rent a Car
        </Link>

        <nav className='flex items-center gap-4 text-sm font-medium text-slate-700'>
          <Link to='/catalogo' className='transition hover:text-blue-600'>Autos</Link>
          <Link to='/reservas' className='transition hover:text-blue-600'>Reservas</Link>
          {isAuth ? (
            <span className='rounded-full bg-blue-600 px-4 py-2 text-white'>Hola, {user?.username}</span>
          ) : (
            <Link to='/auth' className='rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
              Comenzar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
