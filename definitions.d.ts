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
  password: string;
  confirmPassword: string;
  image: HTMLImageElement;
}

export interface IMUser {
  username: string | undefined;
  name: string | undefined;
  image?: string | undefined;
  role: string[] | undefined;
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
interface YupInstructorUpdateInputs
  extends Pick<IInstructor, "name" | "position" | "salary"> {}

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

interface IResponse {
  statusCode: number;
  success: boolean;
  message: string;
}
interface IApiResponseReturn<T> {
  data?: T | undefined;
  error: string | undefined | string[];
  success: string | undefined | string[];
  status: "idle" | "success" | "error";
}
interface IFetchResponse<T> {
  data?: T | undefined | null;
  message: string | undefined | string[];
  status: "idle" | "error" | "success" | "empty" | "not_empty";
}

/**
 * T - indicates to dynamic types
 * T[] - indicates to dynamic array types
 * {[key: string]: T} - indicates to dynamic object types
 * {} - indicates to empty object
 * null - indicates to no value
 * undefined - indicates to unassigned value
 */
interface IFetchResponse2<T> {
  data?: T | T[] | { [key: string]: T } | {} | null | undefined;
  isEmpty?: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | string[] | { [key: string]: string[] } | {} | null;
}

/**
 * Table head names and the keys of the endpoints data
 * this interface used to identify the array that passeed into the <TableLayer/> component into tableHead
 */
interface ITableHead {
  /**
   * make the type works dynamically with the array and the object keys
   */
  [key: string]: string | { key: string; name: string }[];
  name: string;
  // arr: { key: string; name: string }[];
}
