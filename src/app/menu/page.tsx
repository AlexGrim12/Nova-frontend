import { MenuCard } from './components/menu-card'

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Asteroid Exploration
        </h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <MenuCard
            title="Control Panel"
            description="Access the main panel to monitor and select near-Earth asteroids."
            href="/control"
            imageSrc="/api/placeholder/400/300"
          />

          <MenuCard
            title="Live Projection"
            description="View real-time data of the selected asteroid on a dedicated screen."
            href="/projection"
            imageSrc="/api/placeholder/400/300"
          />
          <MenuCard
            title="3D Solar System"
            description="Explore an interactive representation of the solar system and visualize asteroids in context."
            href="/solar-system"
            imageSrc="/api/placeholder/400/300"
          />
          <MenuCard
            title="NOVA"
            description="A voice-powered virtual assistant to interact with the celestial body exploration system."
            href="/nova"
            imageSrc="/api/placeholder/400/300"
          />
        </div>
      </div>
    </main>
  )
}
