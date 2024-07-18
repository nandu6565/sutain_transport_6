import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { TextField, Button, Autocomplete } from "@mui/material";
import { registerValidationSchema } from "./Validation";
import { useNavigate } from "react-router-dom";
import "./feature.css";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      country: "",
      phone: "",
      location: "",
    },
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        console.log("Submitting form with values:", values);
        const response = await axios.post(
          "http://localhost:5000/register",
          values
        );
        console.log("Response from server:", response.data);
        navigate("/login");
      } catch (error) {
        alert("Error during form submission. Check the console for details.");
        console.error("Error during form submission:", error);
      }
    },
  });

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Australia",
    "India",
  ];

  const pagestyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const placementStyles = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  };

  return (
    <div style={pagestyle} className="register">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit} style={pagestyle}>
        <div style={placementStyles}>
          <TextField
            fullWidth
            label="Username"
            {...formik.getFieldProps("username")}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            label="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div style={placementStyles}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            sx={{ maxWidth: "220px" }}
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            sx={{ maxWidth: "220px" }}
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>
        <div style={placementStyles}>
          <Autocomplete
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                sx={{ minWidth: "220px" }}
                {...formik.getFieldProps("country")}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            )}
            onChange={(event) => {
              formik.setFieldValue("country", event.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            {...formik.getFieldProps("phone")}
            sx={{ maxWidth: "220px" }}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </div>
        <TextField
          fullWidth
          label="Location"
          {...formik.getFieldProps("location")}
          sx={{ maxWidth: "220px" }}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="register"
        >
          Register
        </Button>
        <p>
          Have an Account <a href="/login">Sign-In</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
