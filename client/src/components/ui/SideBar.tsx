import { useLocation, Link } from "react-router-dom";

export function SideBar() {
  const location = useLocation();

  const routes = [
    { name: 'Vehiculos', path: '/dashboard/vehicles' },
    { name: 'Reservas', path: '/dashboard/reservation' },
    { name: 'Clientes', path: '/dashboard/clients' },
    { name: 'Configuracion', path: '/dashboard/settings' },
  ];
  return (
    <aside style={{ gridArea: 'sidebar' }} className="border w-62.5 h-full border-gray-200 overflow-x-hidden fixed">
      <header className="border-b mb-2 w-full border-gray-200 h-18" style={{ gridArea: 'header' }}>
        Header
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
        footer
      </footer>
    </aside>
  )
}