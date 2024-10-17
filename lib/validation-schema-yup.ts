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
      "Password must contain at least one lowercase letter",
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter",
    )
    .matches(
      /^(?=.*[^a-zA-Z0-9])/,
      "Password must contain at least one special character, Ex: &",
    )
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: string()
    .required("confirm password is required")
    .oneOf([ref("password")], "Password must match"),
  email: string().email().required(),
  image: string().required("Select image"),
  roleId: number().nullable().optional(),
};
export const yupLoginSchema = object({
  username: user.userName,
  password: user.password,
});
export const yupUserUpdateSchema = object({
  userName: user.userName,
  fullName: user.fullName,
  email: user.email,
  roleId: user.roleId,
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

// export const yupInstructorUpdateSchema = object({
//   name: user.fullName,
//   address: user.fullName,
//   position: user.fullName,
//   salary: user.fullName,
// });

const instructor = {
  fullName: user.fullName,
  nameAr: user.fullName,
  nameEn: user.fullName,
  position: user.fullName,
  salary: number()
    .required("salary is required")
    .min(3, "the salary should be at least 3 numbers"),
  departmentId: number().required("department should be selected"),
};

export const yupInstructorUpdateSchema = object({
  nameAr: instructor.nameAr,
  nameEn: instructor.nameEn,
  position: instructor.position,
  salary: instructor.salary,
  departmentId: instructor.departmentId,
});
export const yupInstructorCreateSchema = object({
  nameAr: instructor.nameAr,
  nameEn: instructor.nameEn,
  position: instructor.position,
  salary: instructor.salary,
  departmentId: instructor.departmentId,
});

const department = {
  deptId: number(),
  instructorId: number().required("instructor is required"),
  managerId: number(),
  name: string()
    .required("name is required")
    .min(3, "name should be at least 3 characters"),
  nameAr: string()
    .required("name is required")
    .min(3, "name should be at least 3 characters"),
  nameEn: string()
    .required("name is required")
    .min(3, "name should be at least 3 characters"),
};

export const yupDepartmentUpdateSchema = object({
  insId: department.instructorId,
  nameAr: department.nameAr,
  nameEn: department.nameEn,
});

export const yupDepartmentCreateSchema = object({
  insId: department.instructorId,
  nameAr: department.nameAr,
  nameEn: department.nameEn,
});

const student = {
  name: string().required("name is required"),
  nameAr: string().required("arabic name is required"),
  nameEn: string().required("english name is required"),
  address: string().required("address is required"),
  departmentName: string().required("department name is required"),
  departmentId: number().required("department id is required"),
};
export const yupStudentUpdateSchema = object({
  // departmentId: department.deptId,
  id: number().optional(),
  departmentId: student.departmentId,
  nameAr: student.nameAr,
  nameEn: student.nameEn,
  address: student.address,
});

export const yupStudentCreateSchema = object({
  nameAr: student.nameAr,
  nameEn: student.nameEn,
  address: student.address,
  departmentId: student.departmentId,
});

const subject = {
  subjectId: number().optional(),
  subjectName: string().required("subject name is required"),
  departmentId: number().required("department id is required"),
  period: string().required("period is required"),
};
export const yupSubjectUpdateSchema = object({
  subjectId: subject.subjectId,
  subjectNameAr: subject.subjectName,
  subjectNameEn: subject.subjectName,
  period: subject.period,
});

export const yupSubjectCreateSchema = object({
  subjectNameAr: subject.subjectName,
  subjectNameEn: subject.subjectName,
  period: subject.period,
});
// export const yupInstructorUpdateSchema = object({
//   nameAr: instructor.nameAr,
//   nameEn: instructor.nameEn,
//   position: instructor.position,
//   salary: instructor.salary,
//   departmentId: instructor.departmentId,
// })
//safimooo
//pass: ff.9df42asdf4Q
// Type
// 'Resolver<{ position: string; salary: string; nameAr: string; nameEn: string; departmentId: string; }>'
// is not assignable to type 'Resolver<YupInstructorUpdateInputs, any>'.
