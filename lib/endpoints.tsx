import axios from "axios";
export const baseURL = "http://schoolmanagmentsystem.runasp.net/api/v1/";
export const apiClient = axios.create({
  baseURL,
});

export const endpoints = {
  authentication: {
    signin: "authentication/sign-in",
    refreshToken: "authentication/refresh-token",
    validateToken: "authentication/validate-token",
    confirmEmail: "authentication/confirm-email",
    sendResetPasswordCode: "authentication/confirm-email",
    confirmResetPassword: "authentication/confirm-reset-password",
    resetPassword: "authentication/reset-password",
  },
  authorization: {
    roles: {
      create: "authorization/roles/create", // add new role
      update: "authorization/roles/update", // update current role
      all: "authorization/roles/ list", // available roles
      id: "authorization/roles/id", // get role by id
      delete: "authorization/roles/delete", // delete role
      getRolesByUserId: "authorization/manage-user-roles/", // { userId } user roles by id
      updateUserRoles: "authorization/update-user-roles/", //  send plain object
    },
    cliams: {
      getClaimsByUserId: "authorization/manage-user-claims/", // { userId }
      updateUserClaims: "authorization/update-user-claims",
    },
  },
  users: {
    current: "users/current-user",
    all: "users/list",
    id: "users/",
    create: "users/create",
    update: "users/update/",
    delete: "users/delete/",
    changePassword: "users/change-password",
  },
  instructors: {
    all: "instructors/list",
    id: "instructors/",
    create: "instructors/create",
    update: "instructors/update",
    delete: "instructors/delete/",
  },
  departments: {
    all: "departments/list",
    id: "departments/",
    create: "departments/create",
    update: "departments/update",
    delete: "departments/delete/",
    studentsCount: "departments/department-student-count",
    studentsCountByDepartmentId: "departments/department-student-count-by-id/",
    top3InstructorsByDepartment: "departments/top3-instructor-by-department",
  },
  students: {
    all: "students/list",
    paginated: "students/pagination",
    id: "students/",
    create: "students/create",
    update: "students/update",
    delete: "students/delete/",
    addStudentToDepartment: "students/add-student-to-department",
  },
  subjects: {
    all: "subjects/list",
    paginated: "subjects/pagination",
    id: "subjects/",
    create: "subjects/create",
    update: "subjects/update",
    delete: "subjects/delete/",
    addSubjectToDepartment: "subjects/add-to-department",
    addInstructorToSubject: "subjects/add-instructor",
    getSubjectsWithItsDepartments: "subjects/subject-with-departments",
    getStudentsForSubject: "subjects/subjects-students-count",
    getTopStudentInSubject: "subjects/top-student-in-each-subject",
  },
};
