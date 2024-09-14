import { object, string } from "yup";

const user = {
  username: string()
    .required("username is required")
    .min(4, "you must add at least 4 characters"),
  password: string()
    .required("password is required")
    .min(6, "you must add at least 6 characters"),
  fullName: string()
    .required("username is required")
    .min(4, "you must add at least 4 characters"),
  email: string().email(),
};
export const loginSchema = object({
  username: user.username,
  password: user.password,
});

//safimooo
//pass: ff.9df42asdf4Q