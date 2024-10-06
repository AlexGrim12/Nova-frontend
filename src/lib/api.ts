import type { ProcessedNEO } from '@/types/neo'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export const fetchNEOs = async (): Promise<ProcessedNEO[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/neos`)
    if (!response.ok) throw new Error('Failed to fetch NEOs')
    return response.json()
  } catch (error) {
    console.error('Error fetching NEOs:', error)
    return []
  }
}
