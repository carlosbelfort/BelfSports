'use client'

export default function Dashboard() {
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : null

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </main>
  )
}