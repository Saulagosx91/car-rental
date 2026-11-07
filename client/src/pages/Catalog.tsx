import { useEffect, useState, type ChangeEvent } from "react";
import { CarService } from "../services";
import { CarCard } from "../components/car/CarCard";
import type { Car } from "../types";
import { useCarData } from "../hooks/useCarData";
import usePageTitle from "../hooks/usePageTitle";

const carService = new CarService();

export function Catalog() {
  usePageTitle("Catalogo de Productos");
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const { brands } = useCarData();
  const [filteredPrice, setFilteredPrice] = useState<number>(1200);
  const [filteredBrand, setFilteredBrand] = useState<number[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await carService.find();
      setCars(carsData);
    }
    fetchCars();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredPrice(Number(e.target.value));
  }

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const brandId = Number(e.target.value);
      setFilteredBrand([...filteredBrand, brandId]);
    } else {
      setFilteredBrand([]);
    }
  }

  const filter = () => {
    const filtered = cars.filter(car => filteredBrand.length > 0 ? car.price >= filteredPrice && filteredBrand.includes(car.brandId) : car.price >= filteredPrice);
    setFilteredCars(filtered);
  }

  return (
    <div className="flex mx-4 gap-4">
      <aside className="bg-white border flex flex-col gap-8 py-3 px-2 border-gray-300 rounded-lg w-56 h-125">
        <div>
          <h2>Filtros</h2>
        </div>
        <div>
          <span>Precio por día</span>
          <input
            type="range"
            onChange={handleChange}
            value={filteredPrice}
            max={2000}
            min={1200}
          />
          <span>C$ {filteredPrice}</span>
        </div>

        <div>
          <span>Marcas</span>
          {
            brands.map(brand => {
              return (
                <div className="flex gap-2" key={brand.id}>
                  <input type="checkbox" value={brand.id} id={`${brand.id}`} className="w-4" onChange={handleCheckChange} />
                  <label htmlFor={`${brand.id}`}>{brand.name}</label>
                </div>
              )
            })
          }
        </div>
        <div>
          <span>Transmision</span>

          <div className="flex gap-2">
            <input type="radio" />
            <label htmlFor="">Automatico</label>
          </div>

          <div className="flex gap-2">
            <input type="radio" />
            <label htmlFor="">Manual</label>
          </div>

        </div>
      </aside>
      <section className="grid w-[70%] p-6 gap-6 place-items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {
          filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard
                id={car.id}
                img={`${import.meta.env.VITE_API_URL}${car.car_image}`}
                price={car.price}
                key={car.id}
                title={car.name}
              />
            ))
          )
            : (
              cars.map(car => (
                <CarCard
                  id={car.id}
                  img={`${import.meta.env.VITE_API_URL}${car.car_image}`}
                  price={car.price}
                  key={car.id}
                  title={car.name}
                />
              ))
            )
        }
      </section>
    </div>
  )
}