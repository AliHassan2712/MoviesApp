//validation Yup schema and types
import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2, "Too short"),
  lastName: yup.string().required("Last name is required").min(2, "Too short"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(8, "Min 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type SignupSchemaType = yup.InferType<typeof signupSchema>;
