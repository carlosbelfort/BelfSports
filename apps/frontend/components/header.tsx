"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1], // easeOut padrão
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1], // easeIn
    },
  },
};

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function getDashboardPath(role?: string) {
    switch (role) {
      case "ADMIN":
        return "/dashboard/admin";
      case "ORGANIZER":
        return "/dashboard/organizer";
      case "PHOTOGRAPHER":
        return "/dashboard/photographer";
      case "USER":
        return "/dashboard";
      default:
        return "/";
    }
  }

  const logoHref = user ? getDashboardPath(user.role) : "/";

  return (
    <header className="w-full z-0 bg-[var(--color3)] text-white shadow-md rounded-b-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link
          href={logoHref}
          className="text-xl font-bold text-[var(--color4)] no-underline hover:opacity-90"
        >
          BelfSports
        </Link>

        {/* Navegação animada */}
        <AnimatePresence mode="wait">
          {!user ? (
            <motion.nav
              key="public"
              className="flex items-center gap-8"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link href="/Sobre" className="no-underline hover:opacity-80">
                Sobre
              </Link>

              <Link href="/contato" className="no-underline hover:opacity-80">
                Contato
              </Link>

              <Link
                href="/login"
                className="no-underline rounded-md bg-[var(--color1)] px-5 py-2 text-sm font-semibold hover:opacity-90"
              >
                Login
              </Link>
            </motion.nav>
          ) : (
            <motion.nav
              key="private"
              className="flex items-center gap-8"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={handleLogout}
                className="rounded-md bg-[var(--color5)] px-5 py-2 text-sm font-semibold hover:opacity-90"
              >
                Sair
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}