import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
    .required("Required"),
  password: Yup.string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      "Must contain at least one number, one lowercase letter, one uppercase letter, one special character, and be at least eight characters long"
    )
    .required("Required"),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      "Must contain at least one number, one lowercase letter, one uppercase letter, one special character, and be at least eight characters long"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
    .required("Required"),
  country: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
});
