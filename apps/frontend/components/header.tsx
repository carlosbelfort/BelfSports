"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="w-full z-0 bg-[var(--color3)] text-white shadow-md rounded-b-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color4)] no-underline hover:opacity-90"
        >
          BelfSports
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-8">
          <Link
            href="/Sobre"
            className="no-underline transition-opacity hover:opacity-80"
          >
            Sobre
          </Link>

          <Link
            href="/contato"
            className="no-underline transition-opacity hover:opacity-80"
          >
            Contato
          </Link>

          {!user ? (
            // 🔓 Não autenticado
            <Link
              href="/login"
              className="no-underline rounded-md bg-[var(--color1)] px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Login
            </Link>
          ) : (
            // 🔐 Autenticado
            <button
              onClick={handleLogout}
              className="rounded-md bg-[var(--color5)] px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
