const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const API_PORT = import.meta.env.VITE_BACKEND_API_PORT;
const SERVER_PORT = `${API_URL}:${API_PORT}`;

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export const loginRequest = async (credentials) => {

  console.log("API_BASE_URL: " + `${SERVER_PORT}${LOGIN_URL}`);
  
  const res = await fetch(`${SERVER_PORT}${LOGIN_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }
  
  return data;
};
