const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const API_PORT = import.meta.env.VITE_BACKEND_API_PORT;
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const SERVER_PORT_URL = `${API_URL}:${API_PORT}${API_URL_BASE}`;

export const apiFetch = async (endpoint, options = {}) => {

  const token = localStorage.getItem("token");
  const res = await fetch(`${SERVER_PORT_URL}${endpoint}`, {
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

  const response = await res.json();
  return response;
};
