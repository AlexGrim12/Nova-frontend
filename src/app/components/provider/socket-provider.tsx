'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { socket } from '@/lib/socket'
import type { Asteroid } from '@/lib/types'

type SocketContextType = {
  selectedAsteroid: Asteroid | null
  selectAsteroid: (asteroid: Asteroid) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(
    null
  )

  useEffect(() => {
    socket.connect()

    socket.on('asteroid_updated', (data: Asteroid) => {
      setSelectedAsteroid(data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const selectAsteroid = (asteroid: Asteroid) => {
    setSelectedAsteroid(asteroid)
    socket.emit('select_asteroid', asteroid)
  }

  return (
    <SocketContext.Provider value={{ selectedAsteroid, selectAsteroid }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
