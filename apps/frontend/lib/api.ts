/**
 * Centraliza a URL do backend
 * Facilita troca de ambiente (dev / prod)
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export const api = async (endpoint: string, options?: RequestInit) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const response = await fetch(`http://localhost:3333${endpoint}`, {
    ...options,
    headers: {
      ...(options?.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return response.json();
};

api.get = (endpoint: string) => {
  return api(endpoint);
};

api.post = (endpoint: string, body?: any) => {
  return api(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

api.patch = (endpoint: string, body?: any) => {
  return api(endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
};

api.delete = (endpoint: string) => {
  return api(endpoint, {
    method: "DELETE",
  });
};
