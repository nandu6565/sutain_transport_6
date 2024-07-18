import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./feature.css";
import { useTheme } from "../ThemeContext";

function ContactUs() {
  const { darkMode } = useTheme();
  const appBarStyle = {
    backgroundColor: darkMode ? "#333" : "#FFF",
    color: darkMode ? "#FFF" : "#333",
  };
  const [formValues, setFormValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
    setFormValues({
      name: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <Box className="fullPageStyles-contact" style={appBarStyle}>
      <div>
        <h1>Contact Us</h1>
        <p>Email: contact@sustain-transport.com</p>
        <p>Phone: +123-456-7890</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          sx={{ maxWidth: "420px" }}
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ maxWidth: "420px" }}
          type="tel"
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ maxWidth: "420px" }}
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "30px" }}
        >
          Contact us
        </Button>
      </form>
    </Box>
  );
}

export default ContactUs;
