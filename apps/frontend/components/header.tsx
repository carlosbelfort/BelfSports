"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
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
        return "/dashboard/user";
      default:
        return "/";
    }
  }

  const logoHref = user ? getDashboardPath(user.role) : "/";

  return (
    <header className="h-16 min-w-full bg-[var(--color3)] text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Botão menu mobile */}
          {user && (
            <button
              onClick={onMenuClick}
              className="lg:hidden rounded-md p-2 hover:bg-white/10"
            >
              ☰
            </button>
          )}

          <Link
            href={logoHref}
            className="text-xl font-bold text-[var(--color4)]"
          >
            BelfSports
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {user && (
            <motion.button
              key="logout"
              onClick={handleLogout}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-md bg-[var(--color5)] px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Sair
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
