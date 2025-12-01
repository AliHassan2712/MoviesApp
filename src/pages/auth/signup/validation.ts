//validation Yup schema and types
import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").min(2, "Too short"),
  lastName: yup.string().required("Last name is required").min(2, "Too short"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required").min(6, "Min 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  agree: yup.boolean().required("You must agree to the terms").oneOf([true], "You must agree to the terms"),
});

export type SignupSchemaType = yup.InferType<typeof signupSchema>;
