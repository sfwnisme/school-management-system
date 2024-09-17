import { object, string } from "yup";

const user = {
  userName: string()
    .required("username is required")
    .min(3, "you must add at least 4 characters"),
  password: string()
    .required("password is required")
    .min(6, "you must add at least 6 characters"),
  fullName: string()
    .required("username is required")
    .min(4, "you must add at least 4 characters"),
  email: string().email().required(),
};
export const loginSchema = object({
  username: user.userName,
  password: user.password,
});
export const yupUserSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
});

//safimooo
//pass: ff.9df42asdf4Q
