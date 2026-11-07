import { useState, type ChangeEvent } from "react"
import type { Car } from "../../types";
import { useCarData } from "../../hooks/useCarData";

export function CarForm({ carToUpdate }: { carToUpdate?: Car }) {

  const [imagePreview, setImagePreview] = useState<string | undefined>('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { brands, motorization, transmission } = useCarData();

  const [formData, setFormData] = useState<Car>(carToUpdate || {
    name: '',
    price: 0,
    color: '',
    passengers: 0,
    plate: '',
    brandId: 0,
    transmissionId: 0,
    motorizationId: 0,
    car_image: '',
    id: 0
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = (e) => {
      e.preventDefault();
      setImagePreview(e.target!.result as string);
    }
  }

  return (
    <>
      <div className="w-full">
        <label htmlFor="" className="ml-20">Fotos del vehículo</label>
        <div
          className={`w-5/6 overflow-hidden border-2 mt-4 border-dashed relative ${isDraggingOver ? 'border-gray-300' : 'border-gray-500'} h-32 mx-auto grid place-items-center`}
          onDragOver={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
        >
          {(!imagePreview && !formData.car_image) && <span className="text-center text-gray-400">Haz clic o arrastra una imagen aqui</span>}
          <input
            type="file"
            className="inset-0 absolute z-10 opacity-0 cursor-pointer"
            name='car_image'
            multiple
            id='carImage'
            onChange={(e) => changeImage(e)}
          />
          {imagePreview && <img src={imagePreview} className='object-cover bg-center h-full w-62' />}
          {formData.car_image && <img src={`${import.meta.env.VITE_API_URL}${formData.car_image}`} className='object-cover bg-center h-full w-62' />}
        </div>
      </div>
      <div className="flex flex-col px-18 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="">Nombre del vehiculo</label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg h-10"
            placeholder="Ingresa el nombre de titulo del vehiculo" />
        </div>
        <fieldset className="border border-gray-300 rounded-lg flex px-2 pb-4">
          <legend className="text-gray-500 ml-5">Detalles</legend>

          <div className="flex flex-col gap-2 px-2 w-1/2">
            <label htmlFor="">Marca</label>
            <select
              className="border border-gray-300 rounded-lg h-9"
              name='brandId'
              value={formData.brandId}
              onChange={handleChange}
            >
              <option selected disabled value={0}>--Seleccione la marca--</option>
              {
                brands.map(brand => (
                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))
              }
            </select>

            <label htmlFor="">Placa</label>
            <input
              type="text"
              name='plate'
              value={formData.plate}
              onChange={handleChange}
              placeholder="Ingrese el número de  placa"
              className="border border-gray-300 rounded-lg h-9"
            />
            <label htmlFor="">Pasajeros</label>
            <input
              type="number"
              name='passengers'
              value={formData.passengers}
              onChange={handleChange}
              placeholder="Ingrese la cantidad de pasajeros"
              className="border border-gray-300 rounded-lg h-9"
            />
            <label htmlFor="">Precio por dia</label>
            <input
              type="number"
              name='price'
              value={formData.price}
              onChange={handleChange}
              placeholder="Ingrese el precio"
              className="border border-gray-300 rounded-lg h-9"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 w-1/2">
            <label htmlFor="">Transmisión</label>
            <select
              className="border border-gray-300 rounded-lg h-9"
              name='transmissionId'
              value={formData.transmissionId}
              onChange={handleChange}
            >
              <option selected disabled value={0}>--Seleccione el tipo de transmisión--</option>
              {
                transmission.map(transmission => (
                  <option value={transmission.id} key={transmission.id}>{transmission.name}</option>
                ))
              }
            </select>

            <label htmlFor="">Motor</label>
            <select
              className="border border-gray-300 rounded-lg h-9"
              name='motorizationId'
              value={formData.motorizationId}
              onChange={handleChange}
            >
              <option selected disabled value={0}>--Seleccione el tipo de motor--</option>
              {
                motorization.map(motorization => (
                  <option value={motorization.id} key={motorization.id}>{motorization.name}</option>
                ))
              }
            </select>

            <label htmlFor="">Color</label>
            <input
              type="text"
              name='color'
              value={formData.color}
              onChange={handleChange}
              placeholder="Ingrese el color del vehículo"
              className="border border-gray-300 rounded-lg h-9"
            />

          </div>
        </fieldset>
      </div>
    </>
  )
}