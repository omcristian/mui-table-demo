import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
  TextField,
  Stack,
  Typography
} from "@mui/material";

function ProductsTable() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const [filters, setFilters] = useState({
    title: "",
    price: "",
    category: "",
    stock: ""
  });

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  if (isLoading) return <CircularProgress />;

  const filteredProducts = data.filter((p) => {

    return (
      p.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      p.category.toLowerCase().includes(filters.category.toLowerCase()) &&
      p.price.toString().includes(filters.price) &&
      p.stock.toString().includes(filters.stock)
    );

  });

  return (

    <Paper sx={{ p: 3 }}>

      <Typography variant="h6" sx={{ mb:2 }}>
        Products
      </Typography>

      {/* FILTER INPUTS */}

      <Stack direction="row" spacing={2} sx={{ mb:2 }}>

        <TextField
          label="Filter Title"
          size="small"
          value={filters.title}
          onChange={(e)=>handleFilterChange("title",e.target.value)}
        />

        <TextField
          label="Filter Category"
          size="small"
          value={filters.category}
          onChange={(e)=>handleFilterChange("category",e.target.value)}
        />

        <TextField
          label="Filter Price"
          size="small"
          value={filters.price}
          onChange={(e)=>handleFilterChange("price",e.target.value)}
        />

        <TextField
          label="Filter Stock"
          size="small"
          value={filters.stock}
          onChange={(e)=>handleFilterChange("stock",e.target.value)}
        />

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredProducts.map((product)=>(
              <TableRow key={product.id} hover>

                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}

export default ProductsTable;
