import styles from './component.module.css';

export default function DevelopmentSection() {
  return (
    <div className='bg-white shadow-2xl rounded-lg mx-auto relative top-30 w-96 h-42 flex flex-col justify-center text-center'>
      <h2 className='font-bold text-3xl'>Sección en desarrollo</h2>
      <section className="flex justify-center my-3 gap-3">
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </section>
      <p className="text-gray-600">Esta sección aun se encuentra en desarrollo, estará disponible pronto</p>
    </div>
  )
}
