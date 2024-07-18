// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./AuthContext";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Dashboard from "./components/Dashboard";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Import the theme object
import { ThemeProvider as CustomThemeProvider } from "./ThemeContext"; // Import the custom ThemeProvider
import Service from "./components/Service";

function App() {
  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <CustomThemeProvider>
          <Router>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="//service" element={<Service />} />
              </Routes>
            </div>
          </Router>
        </CustomThemeProvider>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

export default App;
