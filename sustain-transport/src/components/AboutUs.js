import React from "react";
import "./feature.css";
import { useTheme } from "../ThemeContext";

function AboutUs() {
  const { darkMode } = useTheme();
  const appBarStyle = {
    backgroundColor: darkMode ? "#333" : "#FFF",
    color: darkMode ? "#FFF" : "#333",
  };
  return (
    <div className="fullPageStylesAbout" style={appBarStyle}>
      <div className="subHeading">
        <h1>Who</h1>
        <h3>are We?</h3>
      </div>
      <p className="para">
        We are a team of sustainability and software experts with a combined{" "}
        <br />
        experience of over 25 years in the energy sector and software
        <br />
        development. Our team is spread across the globe enabling a better{" "}
        <br />
        time zone coordination across various time zones.
      </p>
    </div>
  );
}

export default AboutUs;
