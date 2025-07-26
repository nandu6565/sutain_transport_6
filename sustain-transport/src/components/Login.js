import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginValidationSchema } from "./Validation";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";
import { Box, Divider, Typography } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        setIsLoggedIn(true);
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
        setError(error.message);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("Github Sign-in Error:", error);

      if (error.code === "auth/account-exists-with-different-credential") {
        try {
          // Get the email from the error
          const email = error.customData?.email;
          if (!email) {
            setError("Unable to get email from the existing account.");
            return;
          }

          console.log("Checking providers for email:", email);

          // Get sign-in methods for this email
          const methods = await fetchSignInMethodsForEmail(auth, email);
          console.log("Available sign-in methods:", methods);

          if (!methods || methods.length === 0) {
            setError("No sign-in methods found for this email.");
            return;
          }

          // Create a more user-friendly message for the provider names
          const providerNames = methods.map((method) => {
            switch (method) {
              case "google.com":
                return "Google";
              case "password":
                return "Email/Password";
              case "github.com":
                return "GitHub";
              default:
                return method;
            }
          });

          setError(
            `This email is already associated with a different account. ` +
              `Please sign in with one of these methods: ${providerNames.join(
                ", "
              )}`
          );

          // If Google is an option, try to link accounts
          if (methods.includes("google.com")) {
            try {
              // Sign in with Google
              const googleResult = await signInWithPopup(auth, googleProvider);
              console.log("Successfully signed in with Google");

              // Get the GitHub credential
              const githubCredential =
                GithubAuthProvider.credentialFromError(error);

              if (githubCredential) {
                // Link the credentials
                await linkWithCredential(googleResult.user, githubCredential);
                console.log("Successfully linked GitHub account");
                setIsLoggedIn(true);
                navigate("/");
              }
            } catch (linkError) {
              console.error("Error linking accounts:", linkError);
              setError(
                "Error linking accounts. Please try signing in with your primary account first."
              );
            }
          }
        } catch (providerError) {
          console.error("Error getting providers:", providerError);
          setError("Error getting sign-in methods. Please try again.");
        }
      } else {
        setError(error.message || "An error occurred during sign in.");
      }
    }
  };

  const placementStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  };

  return (
    <Box sx={placementStyles} className="login">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          sx={{ minWidth: "420px" }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...formik.getFieldProps("password")}
          sx={{ minWidth: "420px", margin: "12px 0px" }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "200px", margin: "10px auto" }}
        >
          Login
        </Button>

        <Divider sx={{ width: "100%", my: 2 }}>OR</Divider>

        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          sx={{ width: "200px", mb: 2 }}
        >
          Sign in with Google
        </Button>

        <Button
          onClick={handleGithubSignIn}
          variant="outlined"
          sx={{ width: "200px", mb: 2 }}
        >
          Sign in with GitHub
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;
