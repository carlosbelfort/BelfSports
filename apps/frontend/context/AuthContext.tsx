"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  role: "ADMIN" | "ORGANIZER" | "USER" | "PHOTOGRAPHER";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: { id: string; role: User["role"]; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((c) => c.split("="))
    );

    const token = cookies.token;
    const role = cookies.role;
    const userId = localStorage.getItem("userId");

    if (token && role && userId) {
      setUser({
        id: userId,
        role: role as User["role"],
      });
    }

    setLoading(false);
  }, []);

  /*function login(data: { id: string; role: User["role"]; token: string }) {
    setUser({
      id: data.id,
      role: data.role,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.id);
  }*/

  function login(data: { id: string; role: User["role"]; token: string }) {
    setUser({ id: data.id, role: data.role });

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.id);

    document.cookie = `token=${data.token}; path=/; max-age=86400`;
  }

  function logout() {
    setUser(null);
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
