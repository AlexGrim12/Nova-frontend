'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { StarBackground } from '../components/StarBackground'

// Importamos el componente de manera dinámica para evitar problemas de SSR
const Model3DViewer = dynamic(() => import('@/app/components/Model3DViewer'), {
  ssr: false,
})

export default function Home() {
  return (
    // centrar el modelo 3D en la pantalla
    <div className="h-screen bg-black ">
      <StarBackground />

      <Model3DViewer />
    </div>
  )
}
