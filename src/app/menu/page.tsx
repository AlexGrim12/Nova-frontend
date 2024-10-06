import { MenuCard } from './components/menu-card'

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Exploración de Asteroides
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <MenuCard
            title="Panel de Control"
            description="Accede al panel principal para monitorear y seleccionar asteroides cercanos a la Tierra."
            href="/control"
            imageSrc="/api/placeholder/400/300"
          />

          <MenuCard
            title="Proyección en Vivo"
            description="Visualiza en tiempo real los datos del asteroide seleccionado en una pantalla dedicada."
            href="/projection"
            imageSrc="/api/placeholder/400/300"
          />
          <MenuCard
            title="Sistema Solar 3D"
            description="Explora una representación interactiva del sistema solar y visualiza los asteroides en contexto."
            href="/solar-system"
            imageSrc="/api/placeholder/400/300"
          />
          <MenuCard
            title="NOVA"
            description="Un asistente virtual a partir de voz para interactuar con el sistema de exploración de cuerpos celestes."
            href="/nova"
            imageSrc="/api/placeholder/400/300"
          />
        </div>
      </div>
    </main>
  )
}
