import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { successModal, errorModal } from '../../lib/swal';
import { AxiosError } from 'axios';

const userService = new UserService();

export function Login() {
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(formData).includes('')) {
      setError('Por favor ingrese todos los campos');
      return;
    }

    try {
      await userService.login(formData);
      successModal('Bienvenido', 'Inicio de sesion exitoso');
      navigate('/');

    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          errorModal('Error de conexión', 'Por favor, revisa tu conexión a internet.');
          return;
        }

        const { status } = error.response;

        if (status === 404) {
          errorModal('Usuario no encontrado', 'No se encontro el usuario ingresado.');
          return;
        }

        if (status === 403) {
          errorModal('Credenciales incorrectas', 'Por favor, verifica tu email y contraseña.');
          return;
        }
      }

      errorModal('Ha ocurrido un error', 'Intenta de nuevo más tarde');
    }
  };

  return (
    <form action="" className="flex flex-col gap-4 px-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 w-full justify-center">
        <label htmlFor="">Correo electronico</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese su correo electronico"
          className="h-10 border border-gray-300 rounded" />
      </div>
      <div className="flex flex-col gap-2 w-full justify-center">
        <label htmlFor="">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingrese su contraseña"
          className="h-10 border border-gray-300 rounded" />
      </div>
      <input type="submit" value="Iniciar Sesión" className="bg-blue-600 rounded-lg py-2 text-white font-semibold cursor-pointer hover:bg-blue-400 mt-4" />

      {error && <p className='w-full p-2 text-red-500 text-center'>{error}</p>}
    </form>
  )
}