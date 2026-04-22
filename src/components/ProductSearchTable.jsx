import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { searchProducts } from "../api/products";

import {
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress
} from "@mui/material";

function ProductSearchTable() {

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  const {
    data = [],
    isFetching,
    refetch
  } = useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts(query),
    enabled: false
  });

  const handleSearch = () => {

    setQuery(searchInput);

    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (

    <Paper sx={{ p:3 }}>

      <Typography variant="h6" sx={{ mb:2 }}>
        Buscar Producto
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb:3 }}>

        <TextField
          label="Buscar por Nombre"
          fullWidth
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
        >
          Buscar
        </Button>

      </Stack>

      {isFetching && (
        <Typography sx={{ mb:2 }}>
          Loading results...
        </Typography>
      )}

      {isFetching && <CircularProgress sx={{ mb:2 }} />}

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

          {data.map((p)=>(
            <TableRow key={p.codigo} hover>

              <TableCell>{p.codigo}</TableCell>
              <TableCell>{p.nombre}</TableCell>
              <TableCell>{p.marca}</TableCell>
              <TableCell>{p.dimensiones}</TableCell>
              <TableCell>{p.tipo}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </Paper>

  );
}

export default ProductSearchTable;
