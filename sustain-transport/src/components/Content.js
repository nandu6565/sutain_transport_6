// src/components/Content.js
import React from "react";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Service from "./Service";
import { useTheme } from "../ThemeContext";

const fullHeightStyle = {
  height: "100vh",
  overflowY: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Content() {
  const { darkMode } = useTheme();
  const appBarStyle = {
    backgroundColor: darkMode ? "#333" : "#FFF",
    color: darkMode ? "#FFF" : "#333",
  };

  return (
    <div style={appBarStyle}>
      <div style={fullHeightStyle}>
        <Home />
      </div>
      <div style={fullHeightStyle}>
        <AboutUs />
      </div>
      <div style={fullHeightStyle}>
        <Service />
      </div>
      <div style={fullHeightStyle}>
        <Dashboard />
      </div>
      <div style={fullHeightStyle}>
        <ContactUs />
      </div>
    </div>
  );
}

export default Content;
