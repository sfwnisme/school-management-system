export const baseURL = "http://schoolmanagmentsystem.runasp.net/api/v1/";

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
  user: {
    create: "user/create",
    userById: "user/{id}",
    users: "user/list",
    edit: "user/edit",
    delete: "user/delete",
    changePassword: "user/change-password",
  },
};
