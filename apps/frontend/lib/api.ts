/**
 * Centraliza a URL do backend
 * Facilita troca de ambiente (dev / prod)
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

export const api = async (
  endpoint: string,
  options?: RequestInit
) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null

  const response = await fetch(
    `http://localhost:3333${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  )

  return response.json()
}