import Link from 'next/link'

export function CallToAction() {
  return (
    <section className="py-20 bg-purple-900/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to explore space?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join us on this space adventure and uncover the secrets of near-Earth
          asteroids.
        </p>
        <Link
          href="/menu"
          className="bg-white text-purple-900 hover:bg-purple-100 font-bold py-3 px-8 rounded-full text-lg transition-colors inline-block"
        >
          Start Now
        </Link>
      </div>
    </section>
  )
}
