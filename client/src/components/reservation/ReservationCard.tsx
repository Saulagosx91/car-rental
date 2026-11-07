import type { Reservation } from "../../types";
import { formatDate } from "../../utils";

export function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <article className="flex flex-col w-96 min-h-42 bg-white shadow-2xs rounded-lg">
      <div className="h-58 mx-auto">
        <img
          src={`${import.meta.env.VITE_API_URL}${reservation.Car.car_image}`}
          className="h-full bg-center bg-cover object-cover"
        />
      </div>
      <div className="flex flex-col p-2 gap-4">
        <div className="flex w-full justify-around gap-4">

          <div>

            <h3 className="font-bold text-xl">{reservation.Car.name}</h3>
            <p className="text-blue-700"></p>
          </div>

          <div>
            <p>Desde: {formatDate(reservation.start_date)}</p>
            <p>Hasta: {formatDate(reservation.return_date)}</p>
          </div>
        </div>


        <p className="font-bold ml-4 text-xl">Total a pagar: ${reservation.total}</p>

        <button className="bg-red-600 text-white px-3 cursor-pointer hover:bg-red-700 py-2 rounded-lg mt-2 w-full">Cancelar Reserva</button>
      </div>
    </article>
  )
}
