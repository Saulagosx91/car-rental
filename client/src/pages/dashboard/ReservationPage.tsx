import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReservationService } from "../../services"
import type { Reservation } from "../../types";
import { formatDate, TRANSLATED_COLUMNS } from "../../utils";

const reservationService = new ReservationService();

export function ReservationPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationData = await reservationService.find();
      setReservations(reservationData);
    }
    fetchReservations();
  }, []);

  return (
    <div className="p-4">
      <header className="w-full border-b border-gray-300 py-2 mb-4">
        <h1 className="text-3xl font-bold">Gestión de Reservas</h1>
      </header>
      <section>
        <article className="border border-gray-300 rounded-lg w-72 py-2 px-4">
          <p className="text-gray-600">Total de reservas activas</p>
          <span className="text-2xl font-bold">{reservations.length}</span>
        </article>
      </section>

      <table className="w-5/6 mx-auto border-gray-300 rounded-lg mt-10 shadow-xl">
        <thead className="bg-slate-100 h-12">
          <th>Vehiculo</th>
          <th>Cliente</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </thead>
        <tbody className="text-center">
          <tr className="h-12 border-b border-gray-300">
            <td>
              Tesla Model 3
            </td>
            <td>
              Carlos Rodriguez
            </td>
            <td>
              12 may
            </td>
            <td>
              14 may
            </td>
          </tr>

          {
            reservations.map((reservation) => (
              <tr className="h-12 border-b border-gray-300">
                <td>{reservation.Car.name}</td>
                <td>{reservation.User?.username}</td>
                <td>{formatDate(reservation.start_date)}</td>
                <td>{formatDate(reservation.return_date)}</td>
                <td>{TRANSLATED_COLUMNS[reservation.status]}</td>
                <td>
                  <Link to={`/dashboard/reservation/${reservation.id}`} className="text-blue-600 hover:underline">
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}