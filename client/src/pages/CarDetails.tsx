import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import { CarService, ReservationService } from '../services';
import type { Car } from '../types';
import { ReservationForm } from '../components/reservation/ReservationForm';
import { errorModal, successModal } from '../lib/swal';

const carService = new CarService();
const reservationService = new ReservationService();

export function CarDetails() {
  usePageTitle('Detalles del Vehículo');
  const [car, setCar] = useState<Car | null>();
  const [dates, setDates] = useState<{ start_date: string; return_date: string }>();
  const [total, setTotal] = useState<number | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  const carId = Number(params.id);

  useEffect(() => {
    const fetchCar = async () => {
      const carData = await carService.findOne(carId);
      if (!carData) {
        navigate('/catalogo');
      }
      setCar(carData);
    }
    fetchCar();
  }, [carId, navigate]);

  useEffect(() => {
    if (!dates || !car) return;

    const { start_date, return_date } = dates;
    if (!start_date || !return_date) return;

    const start = new Date(start_date).getTime();
    const end = new Date(return_date).getTime();
    const days = (end - start) / (1000 * 3600 * 24);
    if (days > 0) {
      setTotal(days * car.price);
    } else {
      setTotal(null);
    }
  }, [dates, car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDates({
      ...dates!,
      [e.target.name]: e.target.value
    });

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reservationData = {
      ...dates,
      total,
      carId: car?.id
    }

    const success = await reservationService.create(reservationData);
    if (success) {
      navigate('/catalogo');
      successModal('Vehiculo reservado con éxito', 'Tu reserva ha sido creada correctamente.');
      return;
    }

    errorModal('Error al reservar', 'No se pudo crear la reserva. Inténtalo de nuevo más tarde.');
  }

  return (
    <div className='m-4 flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start'>
      <div className='flex flex-col mt-6 gap-4 my-8'>

        <h1 className='text-4xl font-bold'>{car?.name}</h1>
        <div className='h-125'>
          <img src={import.meta.env.VITE_API_URL + car?.car_image} alt="Imagen del auto" className='max-h-full' />
        </div>

        <h2 className='text-2xl font-bold'>Especificaciones</h2>
        <div className='flex gap-4'>
          <article className='bg-white shadow-xl rounded-lg w-38 h-24 flex flex-col items-center'>
            <div className='flex flex-col h-1/2 text-center'>
              <img src="/settings.svg" className='max-h-5/6' />
              <h3 className='font-bold'>Transmisión</h3>
              <p>{car?.Transmission.name}</p>
            </div>
          </article>
          <article className='bg-white shadow-xl rounded-lg w-38 h-24 flex flex-col items-center'>
            <div className='flex flex-col h-1/2 text-center'>
              <img src="/settings.svg" className='max-h-5/6' />
              <h3 className='font-bold'>Pasajeros</h3>
              <p>{car?.passengers}</p>
            </div>
          </article>
          <article className='bg-white shadow-xl rounded-lg w-38 h-24 flex flex-col items-center'>
            <div className='flex flex-col h-1/2 text-center'>
              <img src="/settings.svg" alt="" className='max-h-5/6' />
              <h3 className='font-bold'>Motorización</h3>
              <p>{car?.Motorization.name}</p>
            </div>
          </article>
        </div>

      </div>
      <section className="bg-white shadow-2xl rounded-lg w-80 h-96 px-3 mt-6">
        <p className="font-bold mb-6">C$ {car?.price}<span className='text-gray-400'>/día</span></p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <ReservationForm handleChange={handleChange}>
            <div>
              <div className='flex justify-between'>
                <p className=''>Precio por día:</p> <strong>C$ {car?.price}</strong>
              </div>
              <div className='flex justify-between'>
                <p>Total a pagar: </p> <strong>C$ {total}</strong>
              </div>
            </div>
          </ReservationForm>
        </form>
      </section>
    </div>
  )
}