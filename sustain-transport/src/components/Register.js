import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, Typography, Box } from "@mui/material";
import { registerValidationSchema } from "./Validation";
import { useNavigate } from "react-router-dom";
import "./feature.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);

      try {
        if (values.password !== values.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        console.log("Starting Firebase registration...");
        console.log("Auth object:", auth); // Check if auth is properly initialized

        // Create user with email and password
        console.log("Attempting to create user with:", values.email);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log("User created successfully:", userCredential);

        // Update the user's display name
        console.log("Updating display name...");
        await updateProfile(userCredential.user, {
          displayName: values.name,
        });

        console.log("User registration completed successfully");
        navigate("/login");
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        // Handle specific Firebase error codes
        switch (error.code) {
          case "auth/email-already-in-use":
            setError(
              "Email is already registered. Please use a different email."
            );
            break;
          case "auth/invalid-email":
            setError("Invalid email address.");
            break;
          case "auth/weak-password":
            setError("Password is too weak. Please use a stronger password.");
            break;
          default:
            setError(error.message);
        }
      }
    },
  });

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      padding: "2rem",
    },
    form: {
      width: "100%",
      maxWidth: "800px",
    },
    fieldRow: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1rem",
    },
  };

  return (
    <Box sx={styles.container} className="register">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("Form submitted with values:", formik.values);

          // Check if form is valid
          const errors = await formik.validateForm();
          console.log("Validation errors:", errors);

          if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
              await formik.handleSubmit(e);
            } catch (error) {
              console.error("Error during form submission:", error);
            } finally {
              setIsSubmitting(false);
            }
          } else {
            console.log("Form has validation errors");
          }
        }}
        style={styles.form}
        noValidate
      >
        <div style={styles.fieldRow}>
          <TextField
            fullWidth
            label="Full Name"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div style={styles.fieldRow}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: "200px", mb: 2 }}
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>{" "}
          <Typography>
            Already have an account?{" "}
            <Button color="primary" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}

export default Register;
