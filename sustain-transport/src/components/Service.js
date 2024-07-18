import React from "react";
import "./feature.css";
import { useTheme } from "../ThemeContext";

function Service() {
  const { darkMode } = useTheme();
  const appBarStyle = {
    backgroundColor: darkMode ? "#333" : "#FFF",
    color: darkMode ? "#FFF" : "#333",
  };
  return (
    <div className="fullPageStylesAbout" style={appBarStyle}>
      <div className="subHeading">
        <h1>Services</h1>
        <h3>We Offer</h3>
      </div>
      <div className="para">
        <p>
          <b>Electric Vehicle Rentals:</b> Offer a fleet of electric cars,
          scooters, or bikes for short-term or long-term rental.
        </p>
        <p>
          <b>Charging Infrastructure:</b> Provide charging stations for electric
          vehicles at convenient locations, like businesses, public spaces, or
          residential areas.
        </p>
        <p>
          <b>Eco-Friendly Logistics:</b> Provide sustainable delivery solutions
          using electric vehicles, cargo bikes, or optimized routing for reduced
          emissions.
        </p>
        <p>
          <b>Carbon Offset Programs: </b> Help businesses and individuals
          neutralize their carbon footprint by investing in renewable energy
          projects or supporting conservation efforts.
        </p>
      </div>
    </div>
  );
}

export default Service;
