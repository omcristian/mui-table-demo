const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};