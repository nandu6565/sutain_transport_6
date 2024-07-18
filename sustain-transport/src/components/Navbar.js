// src/components/Navbar.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Info,
  Dashboard,
  Mail,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import CloudIcon from "@mui/icons-material/Cloud";
import { useTheme } from "../ThemeContext";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./navbar.css";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const navbarStyle = {
    backgroundColor: darkMode ? "#000" : "#ccc",
    color: darkMode ? "#FFF" : "#000",
  };

  const handleClick = (event) => {
    setDropdownOpen(event.currentTarget);
  };

  const handleClose = () => {
    setDropdownOpen(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppBar position="fixed" style={navbarStyle}>
      <Toolbar>
        <Typography
          variant="body1"
          component={NavLink}
          to="/"
          className="LinkStyles"
          sx={{ flexGrow: 1, fontWeight: "600", marginLeft: "60px" }}
        >
          Sustainable Transport
        </Typography>
        <Button color="inherit" component={NavLink} to="/about">
          About&nbsp; <Info />
        </Button>
        <Button color="inherit" component={NavLink} to="/service">
          Service&nbsp; <CloudIcon />
        </Button>
        <Button component={NavLink} to="/dashboard" color="inherit">
          Dashboard&nbsp; <Dashboard />
        </Button>

        <Button component={NavLink} to="/contact-us" color="inherit">
          Contact Us&nbsp; <Mail />
        </Button>

        <Button onClick={toggleTheme} color="inherit">
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
        <Box display="flex">
          <Button onClick={handleClick}>
            <AccountCircle />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={dropdownOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(dropdownOpen)}
            onClose={handleClose}
          >
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/register"
                  className="LinkStyles"
                  onClick={handleClose}
                >
                  <MenuItem>Register</MenuItem>
                </NavLink>
                <NavLink
                  to="/login"
                  className="LinkStyles"
                  onClick={handleClose}
                >
                  <MenuItem>Login</MenuItem>
                </NavLink>
              </>
            ) : (
              <MenuItem onClick={handleLogout}>
                Logout <Logout />
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
