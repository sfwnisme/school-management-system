import { ReactNode } from "react";

// this type handle the setState function when using prev
// Ex: setState((prev)=> !prev) as UpdateStateType
type UpdateStateType = (
  updateFn: (prev: boolean) => boolean
) => void | undefined;
type UpdateStateAdvancedType<S> = (updateFn: (prev: S) => S) => void;

//---------------------------------
// database types
//---------------------------------
type RoleTypes = "Admin" | "HR" | "User";
type StringOrNull = string | null;
interface IUser {
  id?: 1;
  userName?: string;
  email?: string;
  imagePath?: string;
  fullName?: string;
  roleId: number;
  roles?: string[];
  createdAt?: string;
  lastUpdate?: string;
}

interface YupUserUpdateInputs {
  id?: number;
  userName: string;
  fullName: string;
  email: string;
  roleId?: string;
  // password?: string;
  // confirmPassword?: string;
}
interface YupUserResetPassword
  extends Pick<YupUserCreateInputs, "password" | "confirmPassword" | "email"> {}

interface YupUserCreateInputs {
  userName: string;
  fullName: string;
  email: string;
  image: keyof number;
  password: string;
  confirmPassword: string;
}

export interface IMUser {
  username: string;
  name: string;
  image?: string;
  role: string[];
}

interface IInstructor {
  instId: number;
  name: string;
  address: string;
  position: string;
  imagePath: null;
  supervisorId: number;
  salary: number;
  deptId: number;
}

interface IDepartment {
  deptId: number;
  managerId: number;
  name: string;
}

interface IStudent {
  studId: number;
  name: string;
  address: string;
  departmentName: null;
}

interface ISubject {
  subjectId: number;
  subjectName: string;
  departments: {
    departmentId: number;
    departmentName: string;
  }[];
}

interface IRole {
  id?: number;
  name: string;
  hasRole?: boolean;
}

enum RolesEnum {
  Admin = "Admin",
  User = "User",
  HR = "HR",
}

interface IRoleByUserId {
  userId: number;
  roles: IRole[];
}
//---------------------------------
// react hook form types
//---------------------------------

type LoginInputTypes = {
  username: string;
  password: string;
};

interface FormDataObjectType<T> {
  [key: string]: T;
}
