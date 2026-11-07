import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoutes = () => {
  const { isAdmin, isLoading } = useContext(AuthContext);
  if (isLoading) return <h1>Cargando...</h1>;

  return (
    isAdmin ? <Outlet /> : <Navigate to={'/'} />
  )
}