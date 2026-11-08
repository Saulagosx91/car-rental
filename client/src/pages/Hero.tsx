import Banner from '../components/ui/Banner';
import { PublicityCard } from '../components/ui/PublicityCard';

const features = [
  {
    icon: '/calendar.svg',
    title: 'Cancelación gratuita',
    description: 'Flexibilidad para cambiar de planes, cancelación sin costo hasta 24 horas antes del alquiler.',
  },
  {
    icon: '/calendar.svg',
    title: 'Atención 24/7',
    description: 'Soporte continuo para resolver cualquier duda o inconveniente durante tu alquiler.',
  },
  {
    icon: '/calendar.svg',
    title: 'Mejor precio garantizado',
    description: 'Ofrecemos las tarifas más competitivas del mercado, asegurando el mejor valor por tu dinero.',
  },
];

export function Hero() {
  return (
    <div>
      <Banner />

      <section className='mx-auto max-w-7xl px-6 py-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold text-slate-900 sm:text-4xl'>¿Por qué elegirnos?</h2>
          <p className='mt-3 text-lg text-slate-600'>
            Diseñamos nuestra experiencia pensando en tu tranquilidad y comodidad en la carretera.
          </p>
        </div>

        <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => (
            <PublicityCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className='bg-slate-900 py-16 text-white'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <h3 className='text-3xl font-bold'>¿Listo para tu próximo viaje?</h3>
          <p className='mt-3 text-slate-300'>Explora nuestro catálogo y reserva el vehículo ideal en minutos.</p>
          <a
            href='/catalogo'
            className='mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700'
          >
            Explorar vehículos
          </a>
        </div>
      </section>
    </div>
  );
}
