// import { deleteCookie, hasCookie } from "cookies-next";

// import { IRole, RolesEnum } from "@/definitions";

enum RolesEnum {
  Admin = "Admin",
  User = "User",
  HR = "HR",
}
export const isAdmin = (
  roles: string[] = [],
  userRoles: string[] = []
): Boolean => {
  const admin = RolesEnum.Admin;
  console.log(roles);

  // display the navs that have the current roles
  // const filter
  if (roles.includes(admin)) return true;
  return false;
};
