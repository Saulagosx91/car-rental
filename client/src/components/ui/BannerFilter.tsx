export default function BannerFilter() {
  return (
    <form className="flex rounded-lg gap-4 justify-center">
      <input
        type="text"
        placeholder="Busca un auto para comenzar"
        className="bg-white border border-gray-300 rounded w-88 p-2" />
      <button
        type="submit"
        className="bg-blue-600 text-xl text-white w-32 rounded-lg cursor-pointer hover:scale-105 hover:bg-blue-500 transition-all duration-200"
      >
        Buscar
      </button>
    </form>
  )
}
