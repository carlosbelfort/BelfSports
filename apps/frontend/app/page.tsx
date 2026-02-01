"use client";

import { Button } from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center
                     px-4 py-8 gap-8"
    >
      {/* ---------- CONTEÚDO PRINCIPAL ---------- */}
      <section className="flex flex-col items-center justify-center text-center  px-6 py-20 rounded-xl border bg-black/40 backdrop-blur-md shadow-sm w-full max-w-sm">
        <div className="text-3xl md:text-5xl font-extrabold leading-tight px-2 py-6">
          <span className="text-red-600 ">Belf Sports</span>
        </div>
        <div>
          <span className="text-gray-200 text-1xl">
            Registrando seus momentos
          </span>
        </div>

        <p className="max-w-2xl text-gray-200 text-base md:text-lg leading-relaxed">
          A plataforma ideal para registrar, organizar e reviver os melhores
          momentos dos seus eventos esportivos, com tecnologia, segurança e uma
          experiência moderna.
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
        <Link
          href="/gallery"
          className="mt-6 px-10 py-4 rounded-xl bg-yellow-600
                     hover:bg-yellow-700 font-semibold text-lg
                     transition-all duration-300 shadow-xl
                     hover:scale-105"
        >
          Acessar Galeria
        </Link>
      </section>
    </main>
  );
}
