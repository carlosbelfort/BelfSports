'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <header className="w-full bg-[var(--color2)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[var(--color4)]">
          BelfSports
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6">
          <Link href="/sobre" className="hover:text-[var(--color3)]">
            Sobre
          </Link>

          <Link href="/contato" className="hover:text-[var(--color3)]">
            Contato
          </Link>

          {!user ? (
            // 🔓 Não autenticado
            <Link
              href="/login"
              className="rounded bg-[var(--color1)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Login
            </Link>
          ) : (
            // 🔐 Autenticado
            <button
              onClick={handleLogout}
              className="rounded bg-[var(--color5)] px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
