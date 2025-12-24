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