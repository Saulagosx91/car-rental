import { useEffect, useState } from "react";
import { CarService, ReservationService, UserService } from "../../services";

const carService = new CarService();
const reservationService = new ReservationService();
const userService = new UserService();

interface Summary {
  activeVehicles: number;
  activeReservations: number;
  clients: number;
}

export function SummaryCard() {
  const [summary, setSummary] = useState<Summary>({
    activeVehicles: 0,
    activeReservations: 0,
    clients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cars, reservations, users] = await Promise.all([
          carService.find(),
          reservationService.find(),
          userService.find(),
        ]);
        setSummary({
          activeVehicles: cars.filter((car) => car.status === "DISPONIBLE").length,
          activeReservations: reservations.filter((reservation) => reservation.status !== "CANCELLED").length,
          clients: users.length,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      label: "Vehiculos activos",
      value: summary.activeVehicles,
      accent: "bg-blue-600",
      light: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      label: "Reservas activas",
      value: summary.activeReservations,
      accent: "bg-emerald-600",
      light: "bg-emerald-50",
      text: "text-emerald-700",
    },
    {
      label: "Clientes",
      value: summary.clients,
      accent: "bg-violet-600",
      light: "bg-violet-50",
      text: "text-violet-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`aspect-square rounded-2xl shadow-lg ${card.light} flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1`}
        >
          <div className={`h-12 w-12 rounded-xl ${card.accent} grid place-items-center text-white text-2xl font-bold`}>
            {card.label.charAt(0)}
          </div>
          <p className={`text-5xl font-extrabold ${card.text}`}>
            {loading ? "..." : card.value}
          </p>
          <p className="text-sm font-medium text-gray-600">{card.label}</p>
        </article>
      ))}
    </div>
  );
}