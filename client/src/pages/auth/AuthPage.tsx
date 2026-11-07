import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
// import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../context/AuthContext';

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const buttonStyles = 'px-6 py-2 cursor-pointer';
  const navigate = useNavigate();

  // const { isAuth, isLoading } = useAuth();
  const { isAuth, isLoading } = useContext(AuthContext);
  console.log(isAuth);

  if (isAuth) navigate('/');

  return isLoading ? <h1>Cargando...</h1> : (
    <section className='mx-auto xl:w-3/6 md:w-3/5 w-5/6 relative top-15 rounded shadow-2xl h-auto min-h-156 grid grid-cols-1 lg:grid-cols-2 mb-10'>
      <section className='py-6 flex flex-col gap-8'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Bienvenido de Nuevo</h1>
          <p className='text-gray-600'>Por favor intruduce tus datos para proceder</p>
        </div>
        <div className='flex gap-4 justify-center'>
          <button onClick={() => setIsLogin(true)} className={`${buttonStyles} ${isLogin ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}>Iniciar Sesion</button>
          <button onClick={() => setIsLogin(false)} className={`${buttonStyles} ${!isLogin ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}>Registrarse</button>
        </div>
        <div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </section>
      <div className='hidden lg:block relative'>
        <div className='bg-[url("/internal_car.png")] w-full h-full bg-cover bg-center rounded-r-lg brightness-50'></div>
        <div className='absolute bottom-10 px-3'>
          <div className='mb-5'>
            <button className='bg-white p-1.25 rounded-full mr-2'></button>
            <button className='bg-white p-1.25 rounded-full mr-2'></button>
            <button className='bg-white p-1.25 rounded-full'></button>
          </div>
          <h3 className='text-white text-xl'>La libertad de conducir lo que quieras, cuando quieras</h3>
          <p className='text-white/60'>Unete a nosotros y viaja donde quieras con el auto que desees</p>
        </div>
      </div>
    </section>
  )
}