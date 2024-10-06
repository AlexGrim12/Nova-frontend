// components/Model3DViewer.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import io from 'socket.io-client'

// Definimos la información de los planetas
const CELESTIAL_BODIES = {
  mercury: {
    name: 'Mercury',
    diameter: '4,879 km',
    distance: '57.9M km',
    orbit: '88 days',
    gravity: '3.7 m/s²',
    model: '/models/mercury/scene.gltf',
    scale: 0.02,
  },
  venus: {
    name: 'Venus',
    diameter: '12,104 km',
    distance: '108.2M km',
    orbit: '225 days',
    gravity: '8.87 m/s²',
    model: '/models/venus/scene.gltf',
    scale: 0.9,
  },
  earth: {
    name: 'Earth',
    diameter: '12,742 km',
    distance: '149.6M km',
    orbit: '365.25 days',
    gravity: '9.81 m/s²',
    model: '/models/earth/scene.gltf',
    scale: 1,
  },
  moon: {
    name: 'Moon',
    diameter: '3,474.8 km',
    distance: '384,400 km',
    orbit: '27.3 days',
    gravity: '1.62 m/s²',
    model: '/models/moon/scene.gltf',
    scale: 0.7,
  },
  mars: {
    name: 'Mars',
    diameter: '6,779 km',
    distance: '227.9M km',
    orbit: '687 days',
    gravity: '3.71 m/s²',
    model: '/models/mars/scene.gltf',
    scale: 0.9,
  },
  jupiter: {
    name: 'Jupiter',
    diameter: '139,820 km',
    distance: '778.6M km',
    orbit: '11.9 years',
    gravity: '24.79 m/s²',
    model: '/models/jupiter/scene.gltf',
    scale: 0.01,
  },
  saturn: {
    name: 'Saturn',
    diameter: '116,460 km',
    distance: '1.4B km',
    orbit: '29.5 years',
    gravity: '10.44 m/s²',
    model: '/models/saturn/scene.gltf',
    scale: 1.5,
  },
  uranus: {
    name: 'Uranus',
    diameter: '50,724 km',
    distance: '2.9B km',
    orbit: '84 years',
    gravity: '8.69 m/s²',
    model: '/models/uranus/scene.gltf',
    scale: 0.002,
  },
  neptune: {
    name: 'Neptune',
    diameter: '49,244 km',
    distance: '4.5B km',
    orbit: '165 years',
    gravity: '11.15 m/s²',
    model: '/models/neptune/scene.gltf',
    scale: 0.02,
  },
  sun: {
    name: 'Sun',
    diameter: '1,391,684 km',
    distance: '0 km',
    orbit: '0 days',
    gravity: '274 m/s²',
    model: '/models/sun/scene.gltf',
    scale: 0.2,
  },
} as const

type CelestialBodyKey = keyof typeof CELESTIAL_BODIES

function Model({ selectedBody }: { selectedBody: CelestialBodyKey }) {
  const modelRef = useRef<THREE.Group>(null)
  const [model, setModel] = useState<GLTF | null>(null)
  const bodyInfo = CELESTIAL_BODIES[selectedBody]

  // Carga el modelo GLTF de manera asíncrona
  useEffect(() => {
    let isMounted = true

    const loadModel = async () => {
      try {
        console.log('Cargando modelo:', bodyInfo.model)

        const gltf = await useGLTF(bodyInfo.model)
        console.log('Modelo cargado:', gltf)

        if (isMounted) {
          setModel(gltf as GLTF)
        }
      } catch (error) {
        console.error('Error al cargar el modelo:', error)
      }
    }

    loadModel()

    // Cleanup en el desmontaje
    return () => {
      isMounted = false
    }
  }, [bodyInfo.model])

  // Rotación continua del modelo
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  if (!model) {
    // Fallback si el modelo aún está cargando
    return (
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
    )
  }

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      scale={bodyInfo.scale}
      position={[0, 0, 0]}
    />
  )
}

// Componente de información del cuerpo celeste
function CelestialBodyInfo({ body }: { body: CelestialBodyKey }) {
  const bodyInfo = CELESTIAL_BODIES[body]

  return (
    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-lg text-white">
      <h1 className="text-5xl font-bold text-white text-center">
        {bodyInfo.name}
      </h1>
      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">Diameter</p>
          <p>{bodyInfo.diameter}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">Distance</p>
          <p>{bodyInfo.distance}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">Orbit</p>
          <p>{bodyInfo.orbit}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold">Gravity</p>
          <p>{bodyInfo.gravity}</p>
        </div>
      </div>
    </div>
  )
}

export default function Model3DViewer() {
  const [selectedBody, setSelectedBody] = useState<CelestialBodyKey>('moon')

  useEffect(() => {
    const socket = io('http://localhost:5000')

    socket.on('update_celestial_body', (data: { body: string }) => {
      console.log('Cuerpo celeste seleccionado:', data.body)

      if (data.body && CELESTIAL_BODIES[data.body as CelestialBodyKey]) {
        setSelectedBody(data.body as CelestialBodyKey)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 2, 5],
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="blue" wireframe />
            </mesh>
          }
        >
          <Model selectedBody={selectedBody} />
        </Suspense>
        <OrbitControls enableDamping />
      </Canvas>

      <div className="absolute left-0 right-0 bottom-12 flex items-center justify-center">
        <CelestialBodyInfo body={selectedBody} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white text-center">
        <button onClick={() => setSelectedBody('mercury')}>Mercury</button>
        <button onClick={() => setSelectedBody('venus')}>Venus</button>
        <button onClick={() => setSelectedBody('earth')}>Earth</button>
        <button onClick={() => setSelectedBody('mars')}>Mars</button>
        <button onClick={() => setSelectedBody('jupiter')}>Jupiter</button>
        <button onClick={() => setSelectedBody('saturn')}>Saturn</button>
        <button onClick={() => setSelectedBody('uranus')}>Uranus</button>
        <button onClick={() => setSelectedBody('neptune')}>Neptune</button>
        <button onClick={() => setSelectedBody('sun')}>Sun</button>
        <button onClick={() => setSelectedBody('moon')}>Moon</button>
      </div>
    </div>
  )
}

useGLTF.preload('/models/mercury/scene.gltf')
useGLTF.preload('/models/venus/scene.gltf')
useGLTF.preload('/models/earth/scene.gltf')
useGLTF.preload('/models/moon/scene.gltf')
useGLTF.preload('/models/mars/scene.gltf')
useGLTF.preload('/models/jupiter/scene.gltf')
useGLTF.preload('/models/saturn/scene.gltf')
useGLTF.preload('/models/uranus/scene.gltf')
useGLTF.preload('/models/neptune/scene.gltf')
useGLTF.preload('/models/sun/scene.gltf')
