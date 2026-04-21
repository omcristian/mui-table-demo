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
    nombre: "",
    marca: "",
    dimensiones: "",
    tipo: ""
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
      p.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      p.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
      p.dimensiones.toString().includes(filters.dimensiones) &&
      p.tipo.toString().includes(filters.tipo)
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
          label="Filter nombre"
          size="small"
          value={filters.nombre}
          onChange={(e)=>handleFilterChange("nombre",e.target.value)}
        />

        <TextField
          label="Filter Marca"
          size="small"
          value={filters.marca}
          onChange={(e)=>handleFilterChange("marca",e.target.value)}
        />

        <TextField
          label="Filter Dimensiones"
          size="small"
          value={filters.dimensiones}
          onChange={(e)=>handleFilterChange("dimensiones",e.target.value)}
        />

        <TextField
          label="Filter Tipo"
          size="small"
          value={filters.tipo}
          onChange={(e)=>handleFilterChange("tipo",e.target.value)}
        />

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Dimensiones</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredProducts.map((product)=>(
              <TableRow key={product.id} hover>

                <TableCell>{product.codigo}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.marca}</TableCell>
                <TableCell>{product.dimensiones}</TableCell>
                <TableCell>{product.tipo}</TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}

export default ProductsTable;
