/**
 * Centraliza a URL do backend
 * Facilita troca de ambiente (dev / prod)
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export const api = async (endpoint: string, options?: RequestInit) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Só define Content-Type se houver body
  if (options?.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // DELETE 204 não tem body
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

api.get = (endpoint: string) => api(endpoint);

api.post = (endpoint: string, body?: any) =>
  api(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

api.patch = (endpoint: string, body?: any) =>
  api(endpoint, {
    method: "PATCH",
    ...(body && { body: JSON.stringify(body) }),
  });

api.delete = (endpoint: string) =>
  api(endpoint, {
    method: "DELETE",
  });

api.postForm = (endpoint: string, formData: FormData) =>
  api(endpoint, {
    method: "POST",
    body: formData,
  });
