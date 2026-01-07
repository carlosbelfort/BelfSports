/*"use client";

import { useEffect, useState } from "react";

import AdminDashboard from "./admin/page";
import OrganizerDashboard from "./organizer/page";
import UserDashboard from "./user/page";
import PhotographerDashboard from "./photographer/page";

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Carregando dashboard...
      </div>
    );
  }

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "ORGANIZER":
      return <OrganizerDashboard />;

    case "PHOTOGRAPHER":
      return <PhotographerDashboard />;

    default:
      return <UserDashboard />;
  }
}


}*/

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