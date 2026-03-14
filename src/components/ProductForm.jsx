import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "../api/products";

import {
  Paper,
  TextField,
  Button,
  Stack,
  Typography
} from "@mui/material";

function ProductForm() {

  const queryClient = useQueryClient();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {

      queryClient.invalidateQueries(["products"]);

      setProduct({
        name: "",
        price: "",
        category: "",
        stock: ""
      });

    }
  });

  const handleChange = (field, value) => {

    setProduct({
      ...product,
      [field]: value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();
    mutation.mutate(product);

  };

  return (

    <Paper sx={{ p: 3, mb: 4 }}>

      <Typography variant="h6">
        Add Product
      </Typography>

      <form onSubmit={handleSubmit}>

        <Stack spacing={2} mt={2}>

          <TextField
            label="Product Name"
            value={product.name}
            onChange={(e)=>handleChange("name",e.target.value)}
            required
          />

          <TextField
            label="Price"
            type="number"
            value={product.price}
            onChange={(e)=>handleChange("price",e.target.value)}
            required
          />

          <TextField
            label="Category"
            value={product.category}
            onChange={(e)=>handleChange("category",e.target.value)}
          />

          <TextField
            label="Stock"
            type="number"
            value={product.stock}
            onChange={(e)=>handleChange("stock",e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
          >
            Save Product
          </Button>

        </Stack>

      </form>

    </Paper>

  );

}

export default ProductForm;
