import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CarForm } from "../../components/car/CarForm";
import { CarService } from "../../services";
import type { Car } from "../../types";
import { successModal } from "../../lib/swal";

const carService = new CarService();

export function EditCar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [carInfo, setCarInfo] = useState<Car>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { state } = location;
  useEffect(() => {

    if (!state) {
      navigate('/dashboard/vehicles');
    }

    const fetchData = async () => {
      const data = await carService.findOne(state);
      setCarInfo(data);
      setIsLoading(false);
    }
    fetchData();

  }, [navigate, state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    delete data.car_image;
    const success = await carService.update(data, state);

    if (success) {
      successModal('Información actualizada', 'Se actualizó la información del vehículo');
      navigate('/dashboard/vehicles');
    } else {
      alert('No se pudo actualizar la informacion')
    }
  }


  return isLoading ? <h1>Cargando...</h1> : (
    <>
      <h1 className="text-4xl font-semibold">Editar información del vehículo</h1>
      <p className="text-gray-600">Modifica los datos para actualizar la información</p>
      <section className="w-5/6 shadow-2xl p-4 mt-10 mx-auto border border-gray-200 rounded-lg">
        <form className="w-full mx-auto flex flex-col gap-8" onSubmit={handleSubmit}>

          <CarForm carToUpdate={carInfo} />
          <div className="flex justify-end pr-18">
            <button
              type="submit"
              className="bg-blue-600 py-2  px-4 text-white w-52 rounded-lg cursor-pointer  hover:bg-blue-500"
            >Guardar Cambios</button>
          </div>
        </form>
      </section>
    </>
  )
}