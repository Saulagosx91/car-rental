import { CarService } from '../../services';
import { CarForm } from '../../components/car/CarForm';
import { successModal } from '../../lib/swal';

const carService = new CarService();

export function CreateCar() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const success = await carService.create(data);
    if (success) {
      successModal('Vehiculo Agregado', 'Se agregó el vehículo correctamente')
    } else {
      alert('No se pudo agregar el vehiculo')
    }
  }

  return (
    <>
      <h1 className="text-4xl font-semibold">Añadir nuevo vehículo</h1>
      <p className="text-gray-600">Introduce los datos del nuevo vehiculo para agregarlo</p>

      <section className="w-5/6 shadow-2xl p-4 mt-10 mx-auto border border-gray-200 rounded-lg">
        <form className="w-full mx-auto flex flex-col gap-8" onSubmit={handleSubmit}>

          <CarForm />
          <div className="flex justify-end pr-18">
            <button
              type="submit"
              className="bg-blue-600 py-2  px-4 text-white w-52 rounded-lg cursor-pointer  hover:bg-blue-500"
            >Guardar Vehiculo</button>
          </div>
        </form>
      </section>
    </>
  )
}