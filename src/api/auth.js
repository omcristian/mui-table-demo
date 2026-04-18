export const loginRequest = async (credentials) => {

  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  console.log("res: " +res.text);
  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
};
