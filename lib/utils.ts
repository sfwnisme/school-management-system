// import { deleteCookie, hasCookie } from "cookies-next";

import { FormDataObjectType } from "@/definitions";
import { getCurrentUser } from "./actions";

// import { IRole, RolesEnum } from "@/definitions";

enum RolesEnum {
  Admin = "Admin",
  User = "User",
  HR = "HR",
}

export const appendToFormData = (data: FormDataObjectType<any>): FormData => {
  const FD = new FormData();
  const objectToArray = Object.entries(data);
  for (const [key, value] of objectToArray) {
    FD.append(key, value);
  }
  return FD;
};

