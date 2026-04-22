import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";

import {
  Paper, TextField, Button, Table, TableBody,
  TableCell, TableHead, TableRow, Typography,
  Stack, CircularProgress, TableSortLabel, TablePagination, TableContainer
} from "@mui/material";

const columns = [
  { id: "codigo", label: "Codigo" },
  { id: "nombre", label: "Nombre" },
  { id: "marca", label: "Marca" },
  { id: "dimensiones", label: "Dimensiones" },
  { id: "stock", label: "Stock" },
  { id: "precioUnitario", label: "Precio Unitario" },
  { id: "tipo", label: "Tipo" }
];

function ProductSearchTable() {

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    nombre: "", marca: "", dimensiones: "",
    tipo: "", stock: "", precioUnitario: ""
  });

  const [orderBy, setOrderBy] = useState("codigo");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const { data = [], isFetching, refetch } = useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts(query),
    enabled: false
  });

  const handleSearch = () => {
    setQuery(searchInput);
    setTimeout(refetch, 0);
  };

  const handleSort = (col) => {
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  const filtered = data.filter((p) =>
    p.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
    p.marca.toLowerCase().includes(filters.marca.toLowerCase()) &&
    p.dimensiones.toString().includes(filters.dimensiones) &&
    p.tipo.toLowerCase().includes(filters.tipo.toLowerCase()) &&
    (filters.stock === "" || p.stock >= Number(filters.stock)) &&
    (filters.precioUnitario === "" || p.precioUnitario >= Number(filters.precioUnitario))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Buscar Producto</Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter" && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>Buscar</Button>
      </Stack>

      {isFetching && <CircularProgress />}

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>

          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontWeight: "bold"
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id)}
                    sx={{ color: "#fff" }}
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
                  No results
                </TableCell>
              </TableRow>
            ) : paginated.map((p) => (
              <TableRow key={p.codigo}>
                {columns.map((col) => (
                  <TableCell key={col.id}>{p[col.id]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(e, n) => setPage(n)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e)=>{
          setRowsPerPage(parseInt(e.target.value,10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default ProductSearchTable;
