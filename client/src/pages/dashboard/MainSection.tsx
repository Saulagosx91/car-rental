import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SummaryCard } from "../../components/ui/SummaryCard";

export function MainSection() {
  const { user } = useContext(AuthContext);

    return (
    <div className="p-6">
      <header className="flex justify-between items-center px-8">
        <div className="block">
          <h2 className="text-2xl font-bold">Bienvenido de nuevo, {user?.username}</h2>
          <p className="font-extralight">En este apartado se muestra un resumen operativo general</p>
        </div>
        <div className="flex gap-4">
          <Link
            to={'/dashboard/vehicles'}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          >
            + Agregar vehiculo
          </Link>
          <Link
            to={'/dashboard/reservation'}
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
          >
            + Agregar Reserva
          </Link>
        </div>
      </header>
      <section className="mt-8 px-8">
        <SummaryCard />
      </section>
    </div>
  )
}
