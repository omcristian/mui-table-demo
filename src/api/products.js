import { apiFetch } from "./api_base";

// GET products (DummyJSON - optional auth, but added for consistency)
export const fetchProducts = () => apiFetch("/products");


// CREATE product (your secured backend)
export const createProduct = (product) =>
  apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(product)
  });


// SEARCH products (DummyJSON search endpoint)
export const searchProducts = async (query) => {
  // encode query to avoid issues with spaces/special chars
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `/products/search?nombre=${encodedQuery}`;
  return apiFetch(endpoint);
};
