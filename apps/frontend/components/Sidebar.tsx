/*"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();

  if (!user) return null;

  const links = {
    ADMIN: [
      { href: "/dashboard/admin", label: "Dashboard" },
      { href: "/dashboard/admin/events", label: "Eventos" },
      { href: "/dashboard/admin/createEvent", label: "Criar Evento" },
      { href: "/dashboard/admin/spots", label: "Spots" },
      { href: "/dashboard/admin/createSpot", label: "Criar Spot" },
      { href: "/dashboard/upload", label: "Upload" },
      { href: "/dashboard/moderation", label: "Moderação de Fotos" },
      { href: "/dashboard/admin/users", label: "Usuários" },
    ],
    ORGANIZER: [
      { href: "/dashboard/organizer", label: "Dashboard" },
      { href: "/dashboard/organizer/listevents", label: "Lista de Eventos" },
      { href: "/dashboard/organizer/events", label: "Criar Evento" },
      { href: "/dashboard/organizer/createSpot", label: "Criar Spot" },
      { href: "/dashboard/organizer/spots", label: "Lista de Spots" },
    ],
    PHOTOGRAPHER: [
      { href: "/dashboard/photographer", label: "Dashboard" },
      { href: "/dashboard/photographer/spots", label: "Spots" },
      { href: "/dashboard/photographer/listUploads", label: "Meus Uploads" },
      { href: "/dashboard/photographer/upload", label: "Upload de Foto" },
    ],
    USER: [
      { href: "/dashboard/user", label: "Meus Eventos" },
      { href: "/dashboard/user/profile", label: "Perfil" },
    ],
  };

  const userLinks = links[user.role];

  return (
    <>
      {/* Overlay mobile }/*
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar }*/
/*<motion.aside
        className="
    fixed
    inset-y-0
    left-0
    z-50
    w-64
    bg-[var(--color1)]
    p-6
    flex
    flex-col
    gap-4
    shadow-xl

    lg:static
    lg:translate-x-0
  "
        initial={false}
        animate={{
          x: open ? 0 : -300,
        }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <h2 className="text-lg font-bold mb-6">Menu</h2>

        <nav className="flex flex-col gap-2">
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="
                rounded-md
                px-3
                py-2
                text-sm
                font-medium
                transition
                hover:bg-white/10
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
   
  );
   
}*/

"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();

  if (!user) return null;

  const links = {
    ADMIN: [
      { href: "/dashboard/admin", label: "Dashboard" },
      { href: "/dashboard/admin/events", label: "Eventos" },
      { href: "/dashboard/admin/createEvent", label: "Criar Evento" },
      { href: "/dashboard/admin/spots", label: "Spots" },
      { href: "/dashboard/admin/createSpot", label: "Criar Spot" },
      { href: "/dashboard/upload", label: "Upload" },
      { href: "/dashboard/moderation", label: "Moderação de Fotos" },
      { href: "/dashboard/admin/users", label: "Usuários" },
    ],
    ORGANIZER: [
      { href: "/dashboard/organizer", label: "Dashboard" },
      { href: "/dashboard/organizer/listevents", label: "Lista de Eventos" },
      { href: "/dashboard/organizer/events", label: "Criar Evento" },
      { href: "/dashboard/organizer/createSpot", label: "Criar Spot" },
      { href: "/dashboard/organizer/spots", label: "Lista de Spots" },
    ],
    PHOTOGRAPHER: [
      { href: "/dashboard/photographer", label: "Dashboard" },
      { href: "/dashboard/photographer/spots", label: "Spots" },
      { href: "/dashboard/photographer/listUploads", label: "Meus Uploads" },
      { href: "/dashboard/photographer/upload", label: "Upload de Foto" },
    ],
    USER: [
      { href: "/dashboard/user", label: "Meus Eventos" },
      { href: "/dashboard/user/profile", label: "Perfil" },
    ],
  };

  const userLinks = links[user.role];

  return (
    <>
      {/* Overlay mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}

      <motion.aside
        className="
    fixed
    inset-y-0
    left-0
    z-50
    w-64
    bg-[var(--color1)]
    p-6
    flex
    flex-col
    gap-4
    shadow-xl

    lg:relative
    
    lg:h-[calc(100vh-4rem)]
    lg:shadow-none
  "
        initial={false}
        animate={{
          x: open ? 0 : "-100%",
        }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <h2 className="text-lg font-bold mb-6">Menu</h2>

        {/* Desktop fix */}
        <div className="hidden lg:block w-64 shrink-0" />

        <nav className="flex flex-col gap-2">
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
