export const fetchProducts = async () => {

  const res = await fetch("https://dummyjson.com/products");

  const { products } = await res.json();

  return products;

};

export const createProduct = async (product) => {

  const res = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  return res.json();

};
