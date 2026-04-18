export const authFetch = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers
    }
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};
