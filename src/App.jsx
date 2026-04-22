import { useState, lazy, Suspense } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  CircularProgress
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Login from "./components/Login";

// 🔥 Lazy-loaded pages
const UsersTable = lazy(() => import("./components/UsersTable"));
const ProductsTable = lazy(() => import("./components/ProductsTable"));
const ProductForm = lazy(() => import("./components/ProductForm"));
const ProductSearchTable = lazy(() => import("./components/ProductSearchTable"));

const drawerWidth = 200;
const collapsedWidth = 70;

function App() {

  const isMobile = useMediaQuery("(max-width:768px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("users");

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleMenuClick = (pageName) => {
    setPage(pageName);
    if (isMobile) setMobileOpen(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case "users":
        return <UsersTable />;
      case "products":
        return <ProductsTable />;
      case "addProduct":
        return <ProductForm />;
      case "searchProduct":
        return <ProductSearchTable />;
      default:
        return <UsersTable />;
    }
  };

  const MenuItem = ({ label, icon, value }) => (
    <Tooltip title={collapsed ? label : ""} placement="right" arrow>
      <ListItemButton
        selected={page === value}
        onClick={() => handleMenuClick(value)}
        sx={{
          justifyContent: collapsed ? "center" : "flex-start",
          px: 2,
          "&.Mui-selected": {
            backgroundColor: "rgba(25, 118, 210, 0.15)",
            borderLeft: "4px solid #1976d2"
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
          {icon}
        </ListItemIcon>
        {!collapsed && <ListItemText primary={label} />}
      </ListItemButton>
    </Tooltip>
  );

  return (
    <Box sx={{ display: "flex" }}>

      {/* TOP BAR */}
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">
              Ingenesis Dashboard
            </Typography>
          </Box>

          <Button color="inherit" onClick={handleLogout}>
            Cerrar
          </Button>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: collapsed ? collapsedWidth : drawerWidth,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : drawerWidth,
            mt: 8
          }
        }}
      >
        <List>
          <MenuItem label="Users" value="users" icon={<PeopleIcon />} />
          <MenuItem label="Products" value="products" icon={<InventoryIcon />} />
          <MenuItem label="Add Product" value="addProduct" icon={<AddBoxIcon />} />
          <MenuItem label="Search Product" value="searchProduct" icon={<SearchIcon />} />

          {!isMobile && (
            <ListItemButton onClick={toggleCollapse}>
              <ListItemIcon>
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Toggle" />}
            </ListItemButton>
          )}
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 10,
          ml: isMobile ? 0 : "5px",
          p: 2
        }}
      >

        {/* 🔥 Suspense wrapper */}
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          }
        >
          {renderPage()}
        </Suspense>

      </Box>

    </Box>
  );
}

export default App;
