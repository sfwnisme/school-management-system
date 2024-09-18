import { object, ref, string } from "yup";

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
export const yupUserUpdateSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
});

export const yupUserCreateSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
  password: user.password,
  confirmPassword: user.password.oneOf(
    [ref("password"), ""],
    "Password must match"
  ),
});

//safimooo
//pass: ff.9df42asdf4Q
