"use server";
import axios, { AxiosError } from "axios";
import { apiClient, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getCookie, setCookie } from "cookies-next";
import { IResponse, IUser, YupUserResetPassword } from "@/definitions";
import { appendToFormData, responseMessage } from "./utils";
import { toast } from "react-toastify";

//----------------------------
// Authentication endpoints
//----------------------------
export async function handleSignIn(
  username: string,
  password: string
): Promise<IResponse | undefined> {
  const FD: FormData = new FormData();
  FD.append("UserName", username);
  FD.append("Password", password);

  try {
    const res = await apiClient.post(endpoints.authentication.signin, FD);
    const token = await res.data.data.accessToken;
    const refreshToken = await res.data.data.refreshToken;
    if (token) {
      setCookie("token", token, { cookies });
      setCookie("refresh-token", refreshToken.token, { cookies });
      revalidatePath("dashboard");
      redirect("/dashboard");
    }
    const { statusCode, statusText } = res.data.data;
    return responseMessage(statusCode, statusText);
  } catch (error) {
    if (isRedirectError(error)) {
      console.log("success");
      throw error;
    }
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const {
          data: { statusCode, message },
          status,
          statusText,
        } = error.response;
        return responseMessage(statusCode || status, message || statusText);
      }
    }
  }
}

export async function renewTokenIfNeeded() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const FD = new FormData();
    const token = getCookie("token", { cookies });
    const refreshToken = getCookie("refresh-token");
    if (token && refreshToken) {
      FD.append("RefreshToken", refreshToken);
      FD.append("AccessToken", token);

      const res = await apiClient.post(
        endpoints.authentication.refreshToken,
        FD
      );
      const { status } = res;
      console.log(status);
      if (status === 204) return res;
      if (status !== 204) {
        setCookie("token", res.data.AccessToken, { cookies });
        setCookie("refresh-token", res.data.refreshToken, { cookies });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function isTokenValid() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const token = getCookie("token", { cookies });
    if (token) {
      const res = await apiClient.get(
        endpoints.authentication.validateToken + "?AccessToken=" + token
      );
      console.log(res);
      return res?.status;
    }
  } catch (error) {
    console.log(error);
  }
}

//----------------------------
// Data endpoints
//----------------------------
// get all the instructors data
export async function getAllUsers() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const token = getCookie("token", { cookies });
    if (token) {
      const res = await apiClient.get(endpoints.users.all);
      console.log(res.data.data);
      revalidatePath("/dashboard/users");
      return res.data.data;
    } else {
      console.log(
        "the token not found in the getAllUsers function from actions.tsx"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      return error;
    } else {
      console.log("get all users error", error);
      return error;
    }
  }
}

//get the loged in user
export async function getCurrentUser() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.users.current);
      console.log(res.data.data.userName);
      console.log(res.data.data.fullName);
      console.log(res.data.data);
      return res.data.data;
    }
  } catch (error) {
    console.error("current user endpoint function errro", error);
  }
}

export async function getUserById(id: number) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const res = await apiClient.get(endpoints.users.id + id);
    return res.data.data;
  } catch (error) {
    console.log("get user by id error", error);
  }
}

export async function updateUser(data: IUser): Promise<IResponse | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const FD = appendToFormData(data);
  try {
    if (token) {
      const res = await apiClient.put(endpoints.users.update, FD);
      const { statusCode, message } = res.data;
      return responseMessage(statusCode, message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      const {
        status,
        message,
        errors: { Image },
      } = error.response?.data;
      return responseMessage(status, message || Image[0]);
    } else {
      return responseMessage(
        400,
        "edit this message from updateUser function action"
      );
    }
  }
}

export async function createUser(
  data: FormData
): Promise<IResponse | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const res = await apiClient.post(endpoints.users.create, data);
    const { statusCode, message } = res.data;
    return responseMessage(statusCode, "user created successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        message,
        errors: { Image },
      } = error.response?.data;
      return responseMessage(status, message || Image[0]);
    } else {
      const errorData = {
        statusCode: 400,
        success: false,
        message: "edit this error message from createUser function action",
      };
      return errorData;
    }
  }
}

export async function deleteUser(id: number) {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await apiClient.delete(endpoints.users.delete + "?id=" + id);
    revalidatePath("users");
    const { statusCode } = res.data;
    return responseMessage(statusCode, "user deleted successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors: id },
      } = error?.response || {};
      console.log("sfnw", error?.response?.data.errors);
      console.log("sfnw", id);
      return responseMessage(status as number, id?.id[0] || statusText);
    } else {
      console.log("safimo", error);
      return responseMessage(400 as number, "hi error");

      // return error;
    }
  }
}

export async function resetUserPassword(
  data: YupUserResetPassword
): Promise<IResponse | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(data);

  const FD = new FormData();
  FD.append("password", data.password);
  FD.append("confirmPassword", data.confirmPassword);
  FD.append("email", data.email);

  try {
    const res = await apiClient.post(
      endpoints.authentication.resetPassword,
      FD
    );
    const successResponse = res.data;
    const responseData = {
      statusCode: successResponse.statusCode,
      success: true,
      message: "The user updated successfully",
    };
    return responseData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("sfwn", error.response?.data);
      console.log("sfwn", error.response);
      const {
        data: { status, message },
        status: statusOne,
        statusText,
      } = error?.response;
      return responseMessage(status || statusOne, message || statusText);
      // return errorData;
    } else {
      const errorData = {
        statusCode: 400,
        success: false,
        message: "edit this error message",
      };
      return errorData;
    }
  }
}

export async function getAllRoles() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const res = await apiClient.get(endpoints.authorization.roles.all);
    console.log(res.data.data);
    return res;
  } catch (error) {
    console.log("get roles error", error);
  }
}

export async function getRolesByUserId(id: number) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const res = await apiClient.get(
      endpoints.authorization.roles.getRolesByUserId + id
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log("get roles by user id error", error);
  }
}

export async function getAllInstructors() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.instructors.all);
      console.log("instructors", res?.data.data);
      return res.data.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    }
  }
}

export async function getInstructorById(id: number) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const res = await apiClient.get(endpoints.instructors.id + id);
    return res.data.data;
  } catch (error) {
    console.log("get user by id error", error);
  }
}

export async function deleteInstructor(id: number) {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await apiClient.delete(
      endpoints.instructors.delete + id
      // endpoints.instructors.delete + "?id=" + id
    );
    console.log(res);
    revalidatePath("instructors");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error;
    } else {
      console.log(error);
      return error;
    }
  }
}

export async function getAllDepartments() {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const res = await apiClient.get(endpoints.departments.all);
      console.log(res.data.data);
      return res.data.data;
    }
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      const errorResponse = error.response?.data;
      const errorData = {
        statusCode: errorResponse.status,
        success: false,
        message: errorResponse.message,
      };
      return errorData;
    } else {
      const errorData = {
        statusCode: 400,
        success: false,
        message: "edit this error message",
      };
      return errorData;
    }
  }
}
export async function deleteDepartment(id: number) {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const res = await apiClient.delete(endpoints.departments.delete + id);
      console.log(res.data);
      console.log(res.data.data);
      revalidatePath("departments");
      return res.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error;
    } else {
      console.log(error);
      return error;
    }
  }
}

export async function getAllStudents() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.students.all);
      console.log(res.data.data);
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteStudent(id: number) {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const res = await apiClient.delete(endpoints.students.delete + id);
      console.log(res.data);
      console.log(res.data.data);
      revalidatePath("students");
      const successResponse = res.data;
      console.log(successResponse);
      return responseMessage(
        successResponse.statusCode,
        "Deleted successfully"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.log(error.response?.data);
      return responseMessage(
        error.response?.status as number,
        error.response?.statusText
      );
    } else {
      console.log(error);
      return error;
    }
  }
}
export async function getAllSubjects() {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.subjects.all);
      console.log(res.data.data);
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSubject(id: number) {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const res = await apiClient.delete(endpoints.subjects.delete + id);
      console.log(res.data);
      console.log(res.data.data);
      revalidatePath("subjects");
      const successResponse = res.data;
      console.log(successResponse);
      return responseMessage(
        successResponse.statusCode,
        "Deleted successfully"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.log(error.response?.data);
      return responseMessage(
        error.response?.status as number,
        error.response?.statusText
      );
    } else {
      console.log(error);
      return error;
    }
  }
}
