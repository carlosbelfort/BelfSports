"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function handleRefresh() {
    router.refresh();
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
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-3"
            >
              <TooltipProvider>
                {/* Refresh */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleRefresh}
                      className="rounded-md p-2 hover:bg-white/10"
                      aria-label="Atualizar"
                    >
                      <RefreshCcw size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Atualizar</span>
                  </TooltipContent>
                </Tooltip>

                {/* Logout */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleLogout}
                      className="rounded-md p-2 hover:bg-white/10"
                      aria-label="Sair"
                    >
                      <LogOut size={18} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Sair</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

