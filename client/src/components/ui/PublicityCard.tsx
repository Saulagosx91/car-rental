interface Props {
  icon: string;
  title: string;
  description: string;
}

export function PublicityCard({ icon, title, description }: Props) {
  return (
    <article className="w-82 border border-gray-200 grid place-items-center h-44 rounded-lg shadow-2xl">
      <div>
        <img src={icon} className="bg-blue-300 p-2 rounded-full" />
      </div>
      <div className="px-2">
        <h3 className="font-bold text-xl">{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}