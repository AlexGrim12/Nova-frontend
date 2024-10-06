'use client'

import { useSocket } from '@/app/components/provider/socket-provider'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { StarBackground } from './StarBackground' // Importamos el fondo de estrellas

function Model(props = {}) {
  const { scene } = useGLTF('/models/asteroid/scene.gltf') // Ruta al modelo GLTF

  // Animación de rotación
  useFrame(() => {
    scene.rotation.y += 0.01 // Ajusta la velocidad de rotación
  })

  return <primitive object={scene} {...props} />
}

export function ProjectionView() {
  const { selectedAsteroid } = useSocket()

  return (
    <div className="h-screen bg-black text-white p-8 relative">
      {/* Fondo de estrellas */}
      <StarBackground />

      {selectedAsteroid ? (
        <div className="flex flex-col items-center justify-center h-full relative z-10">
          <div className="relative w-64 h-64 mb-8">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Model scale={0.1} />
                {/* Ajusta la escala según sea necesario */}
                <OrbitControls />
              </Suspense>
            </Canvas>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">{selectedAsteroid.name}</h1>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Diámetro</p>
                <p>{selectedAsteroid.diameter.toFixed(2)} km</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Velocidad</p>
                <p>{parseFloat(selectedAsteroid.velocity).toFixed(2)} km/h</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Distancia</p>
                <p>
                  {parseFloat(selectedAsteroid.miss_distance).toFixed(2)} km
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold">Estado</p>
                <p
                  className={
                    selectedAsteroid.is_potentially_hazardous
                      ? 'text-red-500'
                      : 'text-green-500'
                  }
                >
                  {selectedAsteroid.is_potentially_hazardous
                    ? 'Peligroso'
                    : 'Seguro'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl text-white">
            Esperando selección de asteroide...
          </p>
        </div>
      )}
    </div>
  )
}

useGLTF.preload('/models/asteroid/scene.gltf') // Pre-carga el modelo
