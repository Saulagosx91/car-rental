import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReservationService } from "../../services";
import type { Reservation } from "../../types";
import { formatDate, TRANSLATED_COLUMNS } from "../../utils";

const reservationService = new ReservationService();

export function ReservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/dashboard/reservation');
      return;
    }

    const fetchData = async () => {
      try {
        const data = await reservationService.findOne(Number(id));
        setReservation(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (isLoading) return <h1>Cargando...</h1>;
  if (!reservation) return <h1>Reserva no encontrada</h1>;

  return (
    <div className="p-4">
      <header className="w-full border-b border-gray-300 py-2 mb-4">
        <h1 className="text-3xl font-bold">Detalle de Reserva #{reservation.id}</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Datos de la reserva</h2>
          <p><span className="font-medium">Estado:</span> {TRANSLATED_COLUMNS[reservation.status]}</p>
          <p><span className="font-medium">Fecha inicio:</span> {formatDate(reservation.start_date)}</p>
          <p><span className="font-medium">Fecha fin:</span> {formatDate(reservation.return_date)}</p>
          <p><span className="font-medium">Total:</span> ${reservation.total}</p>
        </article>

        <article className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Datos del vehículo</h2>
          <p><span className="font-medium">Nombre:</span> {reservation.Car.name}</p>
          <p><span className="font-medium">Placa:</span> {reservation.Car.plate}</p>
          <p><span className="font-medium">Color:</span> {reservation.Car.color ?? '-'}</p>
          <p><span className="font-medium">Pasajeros:</span> {reservation.Car.passengers}</p>
          <p><span className="font-medium">Precio/día:</span> ${reservation.Car.price}</p>
          <p><span className="font-medium">Estado:</span> {reservation.Car.status}</p>
        </article>

        {reservation.User && (
          <article className="border border-gray-300 rounded-lg p-4 md:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Datos de contacto del cliente</h2>
            <p><span className="font-medium">Nombre:</span> {reservation.User.username}</p>
            <p><span className="font-medium">Correo:</span> {reservation.User.email}</p>
          </article>
        )}
      </section>
    </div>
  );
}
