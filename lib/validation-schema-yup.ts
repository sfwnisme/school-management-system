import { object, string } from "yup";

export const loginSchema = object({
  username: string()
    .required("username is required")
    .min(4, "you must add at least 4 characters"),
  password: string()
    .required("password is required")
    .min(6, "you must add at least 6 characters"),
});
