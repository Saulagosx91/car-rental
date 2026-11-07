import { Link } from 'react-router-dom';

interface Props {
  id: number;
  img: string;
  title: string;
  price: number;
}

export function CarCard({ id, img, title, price }: Props) {
  return (
    <Link to={`/vehiculo/${id}/detalles`}>
      <article className="bg-slate-100 border border-gray-300 rounded-lg w-52 h-76 shadow-2xl flex flex-col cursor-pointer hover:scale-105 transition-all duration-400">
        <div className="h-1/2">
          <img src={img} className="h-full w-full bg-center object-cover rounded-t-lg" />
        </div>
        <div className="p-2">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className='flex items-center justify-between px-2 mt-6'>
          <div>
            <p className='text-xs text-gray-600'>
              Precio por día
            </p>
            <span className='text-blue-600 font-semibold'>C$ {price}</span>
          </div>
          <Link to={`/vehiculo/${id}/detalles`} className='bg-blue-600 py-1 px-3 rounded-lg text-white'>Reservar</Link>
        </div>
      </article>
    </Link>
  )
}