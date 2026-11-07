import Banner from "../components/ui/Banner"
import { PublicityCard } from "../components/ui/PublicityCard"

export function Hero() {
  return (
    <div>
      <Banner />

      <div className="px-8 py-4 w-2/5 mx-auto flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center">¿Por qué elegirnos?</h2>
        <p className="text-xl text-center">Diseñamos nuestra experiencia pensando en tu tranquilidad y comodidad en la carretera</p>
      </div>
      <section className="flex gap-8 flex-col lg:flex-row justify-center items-center px-8 mx-auto mt-8">
        <PublicityCard
          icon="/calendar.svg"
          title="Cancelacion Gratuita"
          description="Flexibilidad para cambiar de planes, cancelación sin costo hasta 24 horas antes del alquiler."
        />
        <PublicityCard
          icon="/calendar.svg"
          title="Atencion 24/7"
          description="Soporte continuo para resolver cualquier duda o inconveniente durante tu alquiler."
        />
        <PublicityCard
          icon="/calendar.svg"
          title="Mejor Precio Garantizado"
          description="Ofrecemos las tarifas más competitivas del mercado, asegurando el mejor valor por tu dinero."
        />
      </section>
    </div>
  )
}