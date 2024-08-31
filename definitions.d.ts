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
  phoneNumber?: ReactNode;
  roles?: RoleTypes[];
}
// id: 7,
//     email: 'ae@gmail.com',
//     fullName: 'Ahmed mohamed',
//     address: null,
//     createdAt: '0001-01-01T00:00:00',
//     lastUpdate: null,
//     dateOfBirth: null,
//     gender: '',
//     phoneNumber: '01150054195',
//     roles: [ 'User' ]

//---------------------------------
// react hook form types
//---------------------------------

type LoginInputTypes = {
  username: string;
  password: string;
};
