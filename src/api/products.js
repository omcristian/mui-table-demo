// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// GET products (DummyJSON - optional auth, but added for consistency)
export const fetchProducts = async () => {
  const res = await fetch("http://localhost:8080/api/products", {
    headers: getAuthHeaders()
  });

  const products = await res.json();
  return products;
};


// CREATE product (your secured backend)
export const createProduct = async (product) => {

  const res = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product)
  });

  if (!res.ok) {
    throw new Error("Error creating product");
  }

  return res.json();
};


// SEARCH products (DummyJSON search endpoint)
export const searchProducts = async (query) => {

  const res = await fetch(
    `http://localhost:8080/api/products/search?nombre=${query}`,
    {
      headers: getAuthHeaders()
    }
  );

  if (!res.ok) {
    console.log("Error searching products");
    throw new Error("Error searching products");
  }

  const products = await res.json();
  return products;
};
