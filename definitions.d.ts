import { ReactNode } from "react";

type childrenType = {
  children: ReactNode;
};

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
  id?: number;
  email?: string;
  fullName: string;
  address?: StringOrNull;
  createdAt?: StringOrNull;
  lastUpdate?: StringOrNull;
  dateOfBirth?: StringOrNull;
  gender?: string;
  phoneNumber?: string;
  roles?: RoleTypes[];
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
  departments: string[] | null[];
}

// subjectId: 2,
//     subjectName: 'Physics',
//     departments: [
//       { departmentId: 2, departmentName: 'Physics Department' }
// ]

//---------------------------------
// react hook form types
//---------------------------------

type LoginInputTypes = {
  username: string;
  password: string;
};
