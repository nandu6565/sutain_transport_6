import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginValidationSchema } from "./Validation";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/login", values);
        console.log(response.data);
        if (response.data.message === "Invalid credentials") {
          formik.setErrors({
            username: "Invalid credentials. Please try again.",
          });
        } else {
          setIsLoggedIn(true);
          alert("Login successful");
          navigate("/");
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    },
  });
  const placementStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={placementStyles} className="login">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <TextField
          fullWidth
          label="Username"
          {...formik.getFieldProps("username")}
          sx={{ minWidth: "420px" }}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          label="Password"
          {...formik.getFieldProps("password")}
          sx={{ minWidth: "420px", margin: "12px 0px" }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ width: "200px", margin: "10px auto" }}
        >
          Login
        </Button>
        <p style={{ marginLeft: "120px" }}>
          Create Account <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
