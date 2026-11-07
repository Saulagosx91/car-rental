import BannerFilter from "./BannerFilter"

export default function Banner() {
  return (
    <div className="w-full h-125 relative bg-[url('/bg.jpg')] bg-cover bg-center grid place-items-center">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-6xl font-semibold text-white text-center">Tu viaje comienza con el auto perfecto</h1>
          <p className="text-xl text-white text-center">Desde compactos económicos hasta vehículos de lujo</p>
        </div>
        <BannerFilter />
      </div>
    </div>
  )
} 
