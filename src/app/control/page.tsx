'use client'

import { useEffect, useState } from 'react'
import { Asteroid } from '@/types/asteroid'
import { socket } from '@/lib/socket'
import { AlertCircle, Activity, Navigation2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ControlPage() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([])
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(
    null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    socket.connect()

    fetch('https://nasa-back.vercel.app/api/asteroids')
      .then((res) => res.json())
      .then((data) => {
        setAsteroids(data.asteroids)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching asteroids:', error)
        setLoading(false)
      })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleAsteroidSelect = (asteroid: Asteroid) => {
    setSelectedAsteroid(asteroid)
    socket.emit('select_asteroid', asteroid)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Control de Asteroides NEO
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Asteroides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Navigation2 className="text-purple-400" />
              Lista de Asteroides
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {asteroids.map((asteroid) => (
                  <motion.div
                    key={asteroid.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedAsteroid?.id === asteroid.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700/50 hover:bg-gray-700/80 text-gray-100'
                    }`}
                    onClick={() => handleAsteroidSelect(asteroid)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{asteroid.name}</h3>
                      {asteroid.is_potentially_hazardous && (
                        <AlertCircle className="text-red-400 h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 space-y-1 text-sm opacity-90">
                      <p className="flex items-center gap-2">
                        <span className="text-purple-400">Diámetro:</span>
                        {asteroid.diameter.toFixed(2)} km
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-purple-400">Estado:</span>
                        {asteroid.is_potentially_hazardous ? (
                          <span className="text-red-400">Peligroso</span>
                        ) : (
                          <span className="text-green-400">Seguro</span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Detalles del Asteroide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="text-purple-400" />
              Detalles del Asteroide
            </h2>

            {selectedAsteroid ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-700/50 p-6 rounded-lg"
              >
                <h3 className="text-2xl font-medium text-white mb-4">
                  {selectedAsteroid.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailCard
                    label="Diámetro"
                    value={`${selectedAsteroid.diameter.toFixed(2)} km`}
                  />
                  <DetailCard
                    label="Velocidad"
                    value={`${parseFloat(selectedAsteroid.velocity).toFixed(
                      2
                    )} km/h`}
                  />
                  <DetailCard
                    label="Distancia"
                    value={`${parseFloat(
                      selectedAsteroid.miss_distance
                    ).toFixed(2)} km`}
                  />
                  <DetailCard
                    label="Fecha de aproximación"
                    value={selectedAsteroid.close_approach_date}
                  />
                  <DetailCard
                    label="Estado"
                    value={
                      selectedAsteroid.is_potentially_hazardous
                        ? 'Peligroso'
                        : 'Seguro'
                    }
                    status={
                      selectedAsteroid.is_potentially_hazardous
                        ? 'danger'
                        : 'safe'
                    }
                  />
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Navigation2 className="h-12 w-12 mb-4 text-purple-400" />
                <p className="text-lg">
                  Selecciona un asteroide para ver sus detalles
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

function DetailCard({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status?: 'danger' | 'safe'
}) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <p className="text-sm text-purple-400 mb-1">{label}</p>
      <p
        className={`text-lg font-medium ${
          status === 'danger'
            ? 'text-red-400'
            : status === 'safe'
            ? 'text-green-400'
            : 'text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
