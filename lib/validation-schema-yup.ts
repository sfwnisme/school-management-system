import { mixed, number, object, ref, string } from "yup";

const user = {
  userName: string()
    .required("username is required")
    .min(3, "you must add at least 3 characters"),
  fullName: string()
    .required("username is required")
    .min(3, "you must add at least 3 characters"),
  password: string()
    .required("password is required")
    .min(9, "Password must be at least 10 characters long")
    .max(100, "Password must be less than 101 characters long")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[^a-zA-Z0-9])/,
      "Password must contain at least one special character, Ex: &"
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: string()
    .required("confirm password is required")
    .oneOf([ref("password")], "Password must match"),
  email: string().email().required(),
  image: mixed().required(),
};
export const loginSchema = object({
  username: user.userName,
  password: user.password,
});
export const yupUserUpdateSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
  // password: user.password,
  // confirmPassword: user.confirmPassword,
});

export const yupUserResetPasswordSchema = object({
  password: user.password,
  confirmPassword: user.confirmPassword,
  email: user.email,
});

export const yupUserCreateSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
  password: user.password,
  confirmPassword: user.confirmPassword,
  image: user.image,
});

export const yupInstructorUpdateSchema = object({
  name: user.fullName,
  address: user.fullName,
  position: user.fullName,
  salary: user.fullName,
});

//safimooo
//pass: ff.9df42asdf4Q
