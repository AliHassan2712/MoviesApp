//validation schema and types
import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required"),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
