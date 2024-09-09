"use client";

import { deleteCookie, getCookie, getCookies, hasCookie } from "cookies-next";

export const handleLogout = () => {
  if (hasCookie("token") && hasCookie("refresh-token")) {
    deleteCookie("token");
    deleteCookie("refresh-token");
    window.location.href = "/login";
  }
  return null;
};
