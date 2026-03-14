import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";

function ProductsTable() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <CircularProgress />;

  return (

    <Paper sx={{ p: 2 }}>

      <Table>

        <TableHead>

          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>

        </TableHead>

        <TableBody>

          {data.map((p) => (

            <TableRow key={p.id}>

              <TableCell>{p.id}</TableCell>
              <TableCell>{p.title}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.stock}</TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}

export default ProductsTable;
