import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-black/50" />
        <img
          src="/api/placeholder/1920/1080"
          alt="Space background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Explore Nearby Asteroids
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover and monitor near-Earth asteroids in real-time with data from
          NASA
        </p>
        <Link
          href="/menu"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors inline-block"
        >
          Start Exploration
        </Link>
      </div>
    </section>
  )
}
