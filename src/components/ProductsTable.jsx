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
  Typography,
  TableSortLabel,
  TablePagination
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
    tipo: "",
    stock: "",
    precioUnitario: ""
  });

  const [orderBy, setOrderBy] = useState("codigo");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  if (isLoading) return <CircularProgress />;

  // ✅ Filtering (correct numeric handling)
  const filtered = data.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      p.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
      p.dimensiones.toString().includes(filters.dimensiones) &&
      p.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
      (filters.stock === "" || p.stock >= Number(filters.stock)) &&
      (filters.precioUnitario === "" || p.precioUnitario >= Number(filters.precioUnitario))
    );
  });

  // ✅ Sorting
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  // ✅ Pagination
  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ p: 3 }}>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Products
      </Typography>

      {/* FILTERS */}
      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>

        <TextField label="Nombre" size="small"
          onChange={(e)=>handleFilterChange("nombre", e.target.value)} />

        <TextField label="Marca" size="small"
          onChange={(e)=>handleFilterChange("marca", e.target.value)} />

        <TextField label="Dimensiones" size="small"
          onChange={(e)=>handleFilterChange("dimensiones", e.target.value)} />

        <TextField label="Tipo" size="small"
          onChange={(e)=>handleFilterChange("tipo", e.target.value)} />

        <TextField label="Stock ≥" size="small" type="number"
          onChange={(e)=>handleFilterChange("stock", e.target.value)} />

        <TextField label="Precio ≥" size="small" type="number"
          onChange={(e)=>handleFilterChange("precioUnitario", e.target.value)} />

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>
            <TableRow>

              {[
                { id: "codigo", label: "Codigo" },
                { id: "nombre", label: "Nombre" },
                { id: "marca", label: "Marca" },
                { id: "dimensiones", label: "Dimensiones" },
                { id: "stock", label: "Stock" },
                { id: "precioUnitario", label: "Precio Unitario" },
                { id: "tipo", label: "Tipo" }
              ].map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}

            </TableRow>
          </TableHead>

          <TableBody>

            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((product) => (
                <TableRow key={product.codigo} hover>

                  <TableCell>{product.codigo}</TableCell>
                  <TableCell>{product.nombre}</TableCell>
                  <TableCell>{product.marca}</TableCell>
                  <TableCell>{product.dimensiones}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.precioUnitario}</TableCell>
                  <TableCell>{product.tipo}</TableCell>

                </TableRow>
              ))
            )}

          </TableBody>

        </Table>

      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />

    </Paper>
  );
}

export default ProductsTable;
