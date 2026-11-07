import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from "../../services/user.service";
import type { UserFormData } from "../../types";
import { successModal } from '../../lib/swal';

const userService = new UserService();

export function Register() {

  const initialValues = {
    username: '',
    email: '',
    password: '',
    roleId: 2
  }

  const [formData, setFormData] = useState<UserFormData>(initialValues);
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
      alert('Por favor ingrese todos los datos');
      return;
    }
    const token = await userService.create(formData);
    if (token) {
      successModal('Registrado correctamente', 'Registro de usuario exitoso');
      navigate('/')
    }
  };

  return (
    <form action="" className="flex flex-col gap-4 px-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 w-full justify-center">
        <label htmlFor="">Nombre</label>
        <input
          type="text"
          name="username"
          id="name"
          placeholder="Ingrese su nombre"
          onChange={handleChange}
          value={formData.username}
          className="h-10 border border-gray-300 rounded" />
      </div>
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
      <div className="flex flex-col gap-2 w-full justify-center">
        <label htmlFor="">Repetir Contraseña</label>
        <input
          placeholder="Ingrese nuevamente su contraseña"
          className="h-10 border border-gray-300 rounded" />
      </div>
      <input type="submit" value="Registrarse" className="bg-blue-600 rounded-lg py-2 text-white font-semibold cursor-pointer hover:bg-blue-400 mt-4" />
    </form>
  )
}