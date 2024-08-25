"use client";
import Cookies from "js-cookie";

// export const isAuth = Cookies.get("token");

// status object
// const status = {
//   idle
// }

export const handleLogout = () => {
  Cookies.remove("token");
  window.location.href = "/login";
};
