import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box
} from "@mui/material";

import UsersTable from "./components/UsersTable";
import ProductsTable from "./components/ProductsTable";
import ProductForm from "./components/ProductForm";

const drawerWidth = 220;

function App() {

  const [page, setPage] = useState("users");

  const renderPage = () => {

    switch (page) {

      case "users":
        return <UsersTable />;

      case "products":
        return <ProductsTable />;

      case "addProduct":
        return <ProductForm />;

      default:
        return <UsersTable />;

    }

  };

  return (

    <Box sx={{ display: "flex" }}>

      {/* TOP BAR */}

      <AppBar position="fixed">

        <Toolbar>

          <Typography variant="h6">
            Admin Dashboard
          </Typography>

        </Toolbar>

      </AppBar>

      {/* SIDE MENU */}

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: 8
          }
        }}
      >

        <List>

          <ListItemButton
            onClick={() => setPage("users")}
          >
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
            onClick={() => setPage("products")}
          >
            <ListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton
            onClick={() => setPage("addProduct")}
          >
            <ListItemText primary="Add Product" />
          </ListItemButton>

        </List>

      </Drawer>

      {/* MAIN CONTENT */}

      <Container
        sx={{
          mt: 10,
          ml: `${drawerWidth}px`
        }}
      >

        {renderPage()}

      </Container>

    </Box>

  );

}

export default App;
