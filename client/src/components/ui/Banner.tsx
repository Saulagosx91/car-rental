export default function Banner() {
  return (
    <section className='relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[url("/bg.jpg")] bg-cover bg-center'>
      <div className='absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80' />
      <div className='relative z-10 mx-auto max-w-4xl px-6 text-center text-white'>
        <span className='mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm backdrop-blur'>
          Alquiler de vehículos sin complicaciones
        </span>
        <h1 className='text-4xl font-bold leading-tight sm:text-6xl'>
          Tu viaje comienza con el auto perfecto
        </h1>
        <p className='mt-4 text-lg text-slate-200 sm:text-xl'>
          Desde compactos económicos hasta vehículos de lujo. Reserva en minutos y disfruta la carretera.
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <a
            href='/catalogo'
            className='rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700'
          >
            Ver catálogo
          </a>
          <a
            href='/auth'
            className='rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10'
          >
            Crear cuenta
          </a>
        </div>
      </div>
    </section>
  );
}
