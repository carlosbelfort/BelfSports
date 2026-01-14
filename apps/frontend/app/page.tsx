'use client'

import { Button } from '@/components/Button'
import Link from 'next/link'



export default function Home() {
  return (
    <main className="min-h-screen  bg-[var(--color2)] text-white flex flex-col">

     

      {/* ---------- CONTEÚDO PRINCIPAL ---------- */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          <span className="text-red-600">Belf Sports</span>
          <br />
          <span className="text-gray-200">
            Registrando seus momentos
          </span>
        </h1>

        <p className="max-w-2xl text-gray-400 text-base md:text-lg leading-relaxed">
          A plataforma ideal para registrar, organizar e reviver os melhores
          momentos dos seus eventos esportivos, com tecnologia, segurança e
          uma experiência moderna.
        </p>

        <Link
          href="/login"
          className="mt-6 px-10 py-4 rounded-xl bg-red-600
                     hover:bg-red-700 font-semibold text-lg
                     transition-all duration-300 shadow-xl
                     hover:scale-105"
        >
          Acessar plataforma
        </Link>
        <Link href="/gallery" className="mt-6 px-10 py-4 rounded-xl bg-yellow-600
                     hover:bg-yellow-700 font-semibold text-lg
                     transition-all duration-300 shadow-xl
                     hover:scale-105">
        
            Acessar Galeria
        
        </Link>

      </section>

    </main>
  )
}