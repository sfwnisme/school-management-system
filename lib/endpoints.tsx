import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "http://schoolmanagmentsystem.runasp.net/api/v1/";

export const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const endpoints = {
  auth: {
    signin: "authentication/sign-in",
    refreshToken: "authentication/refresh-token",
    validateToken: "authentication/validate-token",
    confirmEmail: "authentication/confirm-email",
    sendResetPasswordCode: "authentication/confirm-email",
    confirmResetPassword: "authentication/confirm-reset-password",
    resetPassword: "authentication/reset-password",
  },
  users: {
    users: "users/list",
    create: "user/create",
    userById: "user/{id}",
    edit: "user/edit",
    delete: "user/delete",
    changePassword: "user/change-password",
  },
};
