import * as yup from "yup";

export const editProfileSchema = yup.object({
  firstName: yup.string().required("First name is required").min(2),
  lastName: yup.string().required("Last name is required").min(2),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export type EditProfileSchemaType = yup.InferType<typeof editProfileSchema>;
