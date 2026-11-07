import { useEffect, useState } from 'react';
import { ReservationService } from '../services';
import { ReservationCard } from '../components/reservation/ReservationCard';
import type { Reservation } from '../types';

const reservationService = new ReservationService();

export function ReservationView() {

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservations = await reservationService.findUserReservations();
      setReservations(reservations);
    }
    fetchReservations();
  }, []);


  return (
    <div className="p-4">
      <section className='py-5 px-2 bg-white w-2/3 mx-auto rounded-lg shadow-xl'>
        <h1 className="font-bold text-3xl">Mis Reservas</h1>
        <p>Gestiona tus alquileres actuales y consulta tu historial de viajes pasados</p>
      </section>
      <section>
        <h2>Reservas Actuales</h2>

        <div className='grid grid-cols-2 w-2/3 mx-auto gap-4 mt-4 p-4 place-items-center'>
          {
            reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))
          }
        </div>
      </section>
    </div>
  )
}