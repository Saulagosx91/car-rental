import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

interface Props {
  // dates: { start_date: string; return_date: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export function ReservationForm({ handleChange, children }: Props) {
  const { isAuth } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState('');
  const disableStyles = 'bg-gray-300 cursor-not-allowed';
  const minDate = new Date();
  const maxDate = new Date();

  const max = maxDate.setDate(maxDate.getDate() + 30); // Max date is 30 days from today

  return (
    <>
      <div className="flex flex-col">

        <label htmlFor="">Fecha inicio de uso</label>
        <input
          type="date"
          name='start_date'
          // value={dates?.start_date}
          min={minDate.toISOString().split('T')[0]}
          onChange={handleChange}
          max={new Date(max).toISOString().split('T')[0]}
          className={`rounded border border-gray-300 py-2 ${!isAuth && disableStyles}`} disabled={!isAuth}
        />
      </div>

      <div className="flex flex-col">

        <label htmlFor="">Fecha de devolución</label>
        <input
          type="date"
          name='return_date'
          // value={dates?.return_date}
          onChange={handleChange}
          max={new Date(max).toISOString().split('T')[0]}
          className={`rounded border border-gray-300 py-2 ${!isAuth && disableStyles}`} disabled={!isAuth}
        />
      </div>
      {children}
      <button className={`bg-blue-600 text-white font-semibold text-center rounded p-2 ${!isAuth ? disableStyles : 'cursor-pointer'}`}
        disabled={!isAuth}
      >Reservar Auto</button>
      {!isAuth && <p className='text-red-600 mt-4 text-center'>Inicia sesión para reservar un auto</p>}
    </>
  )
}