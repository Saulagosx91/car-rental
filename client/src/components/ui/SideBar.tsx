import { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const routes = [
    { name: 'Vehiculos', path: '/dashboard/vehicles' },
    { name: 'Reservas', path: '/dashboard/reservation' },
    { name: 'Clientes', path: '/dashboard/clients' },
    { name: 'Configuracion', path: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  return (
    <aside style={{ gridArea: 'sidebar' }} className="border w-62.5 h-full border-gray-200 overflow-x-hidden fixed">
      <header className="border-b mb-2 w-full border-gray-200 h-18 flex flex-col justify-center items-center" style={{ gridArea: 'header' }}>
        <span className="text-xl font-bold text-center">Hola, {user?.username}</span>
        <span className="text-sm font-extralight">Rent a car management</span>
      </header>
      <nav className="p-2">
        <ul className="flex flex-col gap-2">
          {
            routes.map((route) => (
              <Link to={route.path} key={route.name} className={`py-2 px-4 hover:bg-blue-100 cursor-pointer w-full rounded ${location.pathname.includes(route.path) && 'bg-blue-200 text-blue-600 font-bold'}`}>{route.name}</Link>
            ))
          }
        </ul>
      </nav>
      <footer className="absolute bottom-10 w-full border-t border-gray-200 h-12" style={{ gridArea: 'footer' }}>
        <button onClick={handleLogout} className="py-2 hover:bg-red-100 cursor-pointer px-4 rounded text-red-500 font-bold">Cerrar sesión</button>
      </footer>
    </aside>
  )
}