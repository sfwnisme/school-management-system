import { ReactNode } from "react";
import { InferType } from "yup";
import { yupDepartmentCreateSchema, yupDepartmentUpdateSchema, yupInstructorCreateSchema, yupInstructorUpdateSchema, yupStudentCreateSchema, yupStudentUpdateSchema, yupSubjectCreateSchema, yupSubjectUpdateSchema, yupUserCreateSchema, yupUserResetPasswordSchema, yupUserUpdateSchema } from "./lib/validation-schema-yup";

// this type handle the setState function when using prev
// Ex: setState((prev)=> !prev) as UpdateStateType
export type UpdateStateType = (
  updateFn: (prev: boolean) => boolean
) => void | undefined;
export type UpdateStateAdvancedType<S> = (updateFn: (prev: S) => S) => void;

//---------------------------------
// database types
//---------------------------------
export type RoleTypes = "Admin" | "HR" | "User";
export type StringOrNull = string | null;
export interface IUser {
  id?: number;
  userName?: string;
  email?: string;
  imagePath?: string | null;
  fullName?: string;
  roles?: string[];
  roleId?: number,
  createdAt?: string;
  lastUpdate?: string;
}
export type YupUserUpdateInputs = InferType<typeof yupUserUpdateSchema>
export type YupUserResetPassword = InferType<typeof yupUserResetPasswordSchema>

export interface YupUserCreateInputs {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: HTMLImageElement;
}
export interface IInstructor {
  instId: number;
  name: string;
  nameAr?: string,
  nameEn?: string,
  address: string;
  position: string;
  imagePath: null;
  supervisorId: number;
  salary: number;
  deptId: number;
}
export interface IInstructorUpdate {
  id?: number,
  nameAr: string,
  nameEn: string,
  position: string,
  salary: number,
  departmentId: number
}
export type YupInstructorUpdateInputs = InferType<typeof yupInstructorUpdateSchema>
export type YupInstructorCreateInputs = InferType<typeof yupInstructorCreateSchema>

export interface IDepartment {
  id: number;
  deptId?: number,
  name: string,
  managerName: string;
  students: { id: number, name: string }[],
  instructors: { id: number, nmae: string }[],
  subjects: { id: number, name: string }[]
}

export type YupDepartmentUpdateInputs = InferType<typeof yupDepartmentUpdateSchema>
export type YupDepartmentCreateInputs = InferType<typeof yupDepartmentCreateSchema>
//----------------------------

export interface IStudent {
  id?: number,
  studId: number;
  name: string;
  address: string;
  departmentName: string[] | null;
}

export type YupStudentUpdateInputs = InferType<typeof yupStudentUpdateSchema>
export type YupStudentCreateInputs = InferType<typeof yupStudentCreateSchema>

export interface ISubject {
  id: number;
  subjectName?: string;
  name?: string,
  departments?: {
    departmentId: number;
    departmentName: string;
  }[];
  period?: string,
}

export interface ISubjectUpdate {
  subjectId: number,
  subjectNameAr: string,
  subjectNameen: string,
  period: string
}
export type YupSubjectUpdateInputs = InferType<typeof yupSubjectUpdateSchema>
export type YupSubjectCreateInputs = InferType<typeof yupSubjectCreateSchema>

export interface IRole {
  id?: number;
  name: string;
  hasRole?: boolean;
}

export interface IRoleByUserId {
  userId: number;
  roles: IRole[];
}
//---------------------------------
// react hook form types
//---------------------------------

export interface FormDataObjectType<T> {
  [key: string]: T;
}

export interface IResponse {
  statusCode: number;
  success: boolean;
  message: string;
}

export interface IApiResponseReturn<T> {
  data?: T | undefined;
  error: string | undefined | string[];
  success: string | undefined | string[];
  status: "idle" | "success" | "error";
}

export interface IFetchResponse<T> {
  data?: T | T[] | { [key: string]: T } | {} | null | undefined;
  isEmpty?: boolean;
  isSuccess: boolean;
  isError: boolean;
  isAuth?: boolean;
  message: string | string[] | { [key: string]: string[] } | {} | null;
}

export interface IClientResponse<T>
  extends Pick<
    IFetchResponse<T>,
    "isEmpty" | "isSuccess" | "isError" | "isAuth" | "message"
  > {
  data?: T;
}

/**
 * Table head names and the keys of the endpoints data
 * this export interface used to identify the array that passeed into the <TableLayer/> component into tableHead
 */
export interface ITableHead {
  /**
   * make the type works dynamically with the array and the object keys
   */
  [key: string]: string | { key: string; name: string }[];
  name: string;
  // arr: { key: string; name: string }[];
}
