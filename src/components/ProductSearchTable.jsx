import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { searchProducts } from "../api/products";

import {
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  CircularProgress,
  Typography
} from "@mui/material";

function ProductSearchTable() {

  const [input, setInput] = useState("");
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

    if (!input.trim()) return;

    setQuery(input);
    refetch();
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }

  };

  return (

    <Paper sx={{ p:3 }}>

      <Typography variant="h6" sx={{ mb:2 }}>
        Search Product
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb:3 }}>

        <TextField
          label="Search by ID or Title"
          fullWidth
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>

      </Stack>

      {isFetching && <CircularProgress />}

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

          {data.map((p)=>(
            <TableRow key={p.id} hover>

              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>

            </TableRow>
          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}

export default ProductSearchTable;
