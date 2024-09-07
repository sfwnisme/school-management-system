// 'use client'
import axios from "axios";
import Cookies from "js-cookie";


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
  users: {
    current: "users/current-user",
    all: "users/list",
    id: "users/",
    create: "users/create",
    edit: "users/edit/",
    delete: "users/delete/",
    changePassword: "users/change-password",
  },
  instructors: {
    all: "instructors/list",
    id: "instructors/",
    create: "instructors/create",
    edit: "instructors/delete/",
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
    edit: "students/edit",
    delete: "students/delete/",
    addStudentToDepartment: "students/add-student-to-department",
  },
  subjects: {
    all: "subjects/list",
    paginated: "subjects/pagination",
    id: "subjects/",
    create: "subjects/create",
    edit: "subjects/edit",
    delete: "subjects/delete/",
    addSubjectToDepartment: "subjects/add-to-department",
    addInstructorToSubject: "subjects/add-instructor",
    getSubjectsWithItsDepartments: "subjects/subject-with-departments",
    getStudentsForSubject: "subjects/subjects-students-count",
    getTopStudentInSubject: "subjects/top-student-in-each-subject",
  },
};
