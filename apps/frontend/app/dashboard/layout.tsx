"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Carregando dashboard...
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Header onMenuClick={() => setSidebarOpen(true)} />


      {/* Conteúdo */}
      <div className="flex flex-1 ">
        {/* Sidebar */}
        <div className="hidden lg:block w-64">
          <Sidebar open={true} onClose={() => {}} />
        </div>

        {/* Sidebar mobile*/}
        <div className="lg:hidden">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
