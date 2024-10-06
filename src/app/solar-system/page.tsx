'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { socket } from '@/lib/socket'
import { Asteroid } from '@/types/asteroid'

export default function SolarSystemPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(
    null
  )

  useEffect(() => {
    if (!containerRef.current) return

    // Configuración básica
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Posición inicial de la cámara
    camera.position.z = 50
    camera.position.y = 30

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)

    // Luz direccional (sol)
    const sunLight = new THREE.PointLight(0xffffff, 1)
    scene.add(sunLight)

    // Crear el Sol
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32)
    const sunMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    scene.add(sun)

    // Crear planetas
    const planets: THREE.Mesh[] = []
    const planetData = [
      { name: 'Mercury', radius: 0.8, distance: 10, color: 0x888888 },
      { name: 'Venus', radius: 1.2, distance: 15, color: 0xe39e1c },
      { name: 'Earth', radius: 1.5, distance: 20, color: 0x2233ff },
      { name: 'Mars', radius: 1, distance: 25, color: 0xff3300 },
      { name: 'Jupiter', radius: 3, distance: 32, color: 0xd8ca9d },
      { name: 'Saturn', radius: 2.5, distance: 38, color: 0xead6b8 },
      { name: 'Uranus', radius: 1.8, distance: 43, color: 0x99ffff },
      { name: 'Neptune', radius: 1.8, distance: 48, color: 0x3333ff },
    ]

    planetData.forEach((data) => {
      const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32)
      const planetMaterial = new THREE.MeshPhongMaterial({ color: data.color })
      const planet = new THREE.Mesh(planetGeometry, planetMaterial)

      // Posición inicial
      planet.position.x = data.distance

      planets.push(planet)
      scene.add(planet)
    })

    // Crear cinturones de órbita
    planetData.forEach((data) => {
      const orbitGeometry = new THREE.RingGeometry(
        data.distance - 0.1,
        data.distance + 0.1,
        64
      )
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = Math.PI / 2
      scene.add(orbit)
    })

    // Asteroid belt
    const asteroidBelt = new THREE.Group()
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = Math.random() * 5 + 27 // Between Mars and Jupiter

      const asteroidGeometry = new THREE.SphereGeometry(0.05, 4, 4)
      const asteroidMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
      })
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial)

      asteroid.position.x = Math.cos(theta) * radius
      asteroid.position.z = Math.sin(theta) * radius
      asteroid.position.y = (Math.random() - 0.5) * 2

      asteroidBelt.add(asteroid)
    }
    scene.add(asteroidBelt)

    let asteroidMesh: THREE.Mesh | null = null

    // Escuchar eventos de socket para asteroides seleccionados
    socket.on('asteroid_updated', (data: Asteroid) => {
      setSelectedAsteroid(data)

      // Remover asteroide anterior si existe
      if (asteroidMesh) {
        scene.remove(asteroidMesh)
      }

      // Crear nuevo asteroide
      const size = data.diameter / 10 // Escalar el tamaño para visualización
      const asteroidGeometry = new THREE.SphereGeometry(size, 16, 16)
      const asteroidMaterial = new THREE.MeshPhongMaterial({
        color: data.is_potentially_hazardous ? 0xff0000 : 0x00ff00,
        emissive: data.is_potentially_hazardous ? 0x330000 : 0x003300,
      })
      asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial)

      // Posicionar el asteroide
      const distance = 15 // Distancia fija para visualización
      asteroidMesh.position.set(distance, 0, distance)
      scene.add(asteroidMesh)
    })

    // Animación
    let time = 0
    function animate() {
      requestAnimationFrame(animate)

      time += 0.001

      // Rotar planetas
      planets.forEach((planet, index) => {
        const speed = 0.3 / (index + 1)
        const distance = planetData[index].distance

        planet.position.x = Math.cos(time * speed) * distance
        planet.position.z = Math.sin(time * speed) * distance
        planet.rotation.y += 0.02
      })

      // Rotar cinturón de asteroides
      asteroidBelt.rotation.y += 0.0001

      // Actualizar controles y renderizar
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Overlay con información del asteroide */}
      {selectedAsteroid && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-lg text-white max-w-sm">
          <h2 className="text-xl font-bold mb-2">{selectedAsteroid.name}</h2>
          <div className="space-y-1 text-sm">
            <p>Diámetro: {selectedAsteroid.diameter.toFixed(2)} km</p>
            <p>
              Velocidad: {parseFloat(selectedAsteroid.velocity).toFixed(2)} km/h
            </p>
            <p>
              Distancia: {parseFloat(selectedAsteroid.miss_distance).toFixed(2)}{' '}
              km
            </p>
            <p
              className={
                selectedAsteroid.is_potentially_hazardous
                  ? 'text-red-400'
                  : 'text-green-400'
              }
            >
              Estado:{' '}
              {selectedAsteroid.is_potentially_hazardous
                ? 'Peligroso'
                : 'Seguro'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
