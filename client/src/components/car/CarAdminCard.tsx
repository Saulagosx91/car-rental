interface Props {
  id: number;
  img: string;
  title: string;
  price: number;
  plate: string;
}
import { Link } from "react-router-dom";

export function CarAdminCard({ id, img, title, price, plate }: Props) {
  return (
    <article className="bg-white border border-gray-300 rounded-lg w-52 h-76 shadow-2xl flex flex-col cursor-pointer hover:scale-105 transition-all duration-400">
      <div className="h-1/2">
        <img src={img} className="h-full w-full bg-center object-cover rounded-t-lg" />
      </div>
      <div className="p-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span>C$ {price}</span>
        <hr className="border-gray-300 my-4" />
        <div className="flex justify-between items-center">
          <span>{plate}</span>
          <div className="flex">
            <Link
              to={`/dashboard/vehicles/edit`}
              state={id}
            >
              <img src="/pencil.svg" className="p-2 hover:bg-gray-300 rounded-full" />
            </Link>
            <img src="/trash.svg" className="p-2 hover:bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  )
}