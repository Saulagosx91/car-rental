import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { Hero } from '../pages/Hero';
import { Auth } from '../pages/auth/AuthPage';
import { Catalog } from '../pages/Catalog';
import { CarDetails } from '../pages/CarDetails';
import { ReservationView } from '../pages/ReservationView';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path="/" element={<Hero />} index />
        <Route path="/auth" element={<Auth />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/vehiculo/:id/detalles" element={<CarDetails />} />
        <Route path="/reservas" element={<ReservationView />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;