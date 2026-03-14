import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TablePagination,
  TextField,
  IconButton,
  TableSortLabel,
  Stack
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function UsersTable() {

  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const [filters, setFilters] = useState({
    id: "",
    name: "",
    email: "",
    website: ""
  });

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <CircularProgress />
      </div>
    );

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const handleFilterChange = (column, value) => {
    setFilters({
      ...filters,
      [column]: value
    });
    setPage(0);
  };

  const filtered = data.filter((user) => {

    return (
      user.id.toString().includes(filters.id) &&
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.website.toLowerCase().includes(filters.website.toLowerCase())
    );

  });

  const sorted = [...filtered].sort((a, b) => {

    if (order === "asc")
      return a[orderBy] > b[orderBy] ? 1 : -1;

    return a[orderBy] < b[orderBy] ? 1 : -1;

  });

  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (

    <Paper sx={{ maxWidth: 1100, margin: "auto", mt: 4 }}>

      <Typography variant="h6" sx={{ p: 2 }}>
        Users Management
      </Typography>

      {/* FILTERS */}

      <Stack direction="row" spacing={2} sx={{ p: 2 }}>

        <TextField
          label="Filter ID"
          size="small"
          value={filters.id}
          onChange={(e)=>handleFilterChange("id",e.target.value)}
        />

        <TextField
          label="Filter Name"
          size="small"
          value={filters.name}
          onChange={(e)=>handleFilterChange("name",e.target.value)}
        />

        <TextField
          label="Filter Email"
          size="small"
          value={filters.email}
          onChange={(e)=>handleFilterChange("email",e.target.value)}
        />

        <TextField
          label="Filter Website"
          size="small"
          value={filters.website}
          onChange={(e)=>handleFilterChange("website",e.target.value)}
        />

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>
            <TableRow>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={order}
                  onClick={()=>handleSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={order}
                  onClick={()=>handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Actions</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {paginated.map((user) => (

              <TableRow key={user.id} hover>

                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>

                <TableCell>

                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,10,25]}
        onPageChange={(e,newPage)=>setPage(newPage)}
        onRowsPerPageChange={(e)=>{
          setRowsPerPage(parseInt(e.target.value,10));
          setPage(0);
        }}
      />

    </Paper>

  );
}

export default UsersTable;
