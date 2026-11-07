import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CarService } from "../../services";
import { CarAdminCard } from "../../components/car/CarAdminCard";
import type { Car } from "../../types";

const carService = new CarService();

export function CarPage() {
  const [searchTerm, setSearchTerm] = useState<string>("Alquilados");
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const buttonStyhles = 'py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-400';

  useEffect(() => {
    const fetchData = async () => {
      const carsData = await carService.find();
      setCars(carsData);
    }
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const plate = document.getElementById('input-car-plate') as HTMLInputElement;
    const filtered = cars.find(car => car.plate.toLowerCase() === plate.value.toLowerCase());
    if (filtered) {
      setFilteredCars([filtered]);
    }
  }


  return (
    <>
      <header className="w-full py-4 px-8 border-b border-gray-300 flex flex-col gap-4">
        <section className="flex justify-between w-full items-center">
          <div>
            <h1 className="text-4xl font-bold">Gestión de Vehiculos</h1>
            <p className="text-gray-500">Administra el inventario y estado de los vehiculos</p>
          </div>
          <div>
            <Link
              to={'/dashboard/vehicles/add'}
              className="bg-blue-600 py-3 px-4 text-white rounded-lg cursor-pointer  hover:bg-blue-500"
            >+Agregar Vehiculo</Link>
          </div>
        </section>
        <div className="w-full flex items-center justify-between">

          <div className="flex gap-4">
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Buscar por matricula"
                className="bg-white border border-gray-300 rounded w-88 p-2"
                id="input-car-plate"
              />
              <button
                type="submit"
                className="bg-blue-600 py-2 px-6 text-white rounded-lg cursor-pointer  hover:bg-blue-500"
              >
                Buscar
              </button>
            </form>
            <button
              className="bg-red-300 text-red-600 font-bold px-4 rounded-lg cursor-pointer"
              onClick={() => setFilteredCars([])}
            >X</button>
          </div>

          <div className="flex gap-3">
            <button
              className={`${buttonStyhles} ${searchTerm === 'Todos' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('Todos')}
            >
              Todos
            </button>
            <button
              className={`${buttonStyhles} ${searchTerm === 'Disponibles' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('Disponibles')}
            >
              Disponibles
            </button>
            <button
              className={`${buttonStyhles} ${searchTerm === 'Alquilados' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSearchTerm('Alquilados')}
            >
              Alquilados
            </button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-4 gap-y-6 p-4 place-items-center">
        {
          filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarAdminCard
                id={car.id}
                img={`${import.meta.env.VITE_API_URL}${car.car_image}`}
                price={car.price}
                title={car.name}
                key={car.id}
                plate={car.plate}
              />
            ))
          ) : (
            cars.map(car => (
              <CarAdminCard
                id={car.id}
                img={`${import.meta.env.VITE_API_URL}${car.car_image}`}
                price={car.price}
                title={car.name}
                key={car.id}
                plate={car.plate}
              />
            ))
          )
        }
      </section>
    </>
  )
}