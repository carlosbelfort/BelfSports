"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    router.replace(`/dashboard/${user.role.toLowerCase()}`);
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      Carregando dashboard...
    </div>
  );
}