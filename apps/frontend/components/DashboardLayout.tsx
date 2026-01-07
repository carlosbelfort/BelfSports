/*"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar }
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Conteúdo principal }
      <div className="flex flex-1 flex-col">
        {/* Header }
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Conteúdo das páginas }
        <main className="flex-1 p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
}*/
