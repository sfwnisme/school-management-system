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
  id: 1;
  userName: string;
  email: string;
  imagePath: null;
  fullName: string;
  roles: string[];
  createdAt: string;
  lastUpdate: string;
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
  id: number;
  name: string;
  hasRole: boolean;
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
