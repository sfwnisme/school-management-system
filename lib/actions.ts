"use server";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiClient, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
  IDepartment,
  IFetchResponse,
  IFetchResponse2,
  IInstructor,
  IRole,
  IStudent,
  ISubject,
  IUser,
  YupUserResetPassword,
} from "@/definitions";
import {
  apiResponse,
  fetchResponse,
  appendToFormData,
  responseMessage,
  fetchResponse2,
} from "./utils";

//----------------------------
// Authentication endpoints
//----------------------------
export async function handleSignIn(
  username: string,
  password: string
): Promise<IFetchResponse2<[]> | undefined> {
  const FD: FormData = new FormData();
  FD.append("UserName", username);
  FD.append("Password", password);

  try {
    const res = await apiClient.post(endpoints.authentication.signin, FD);
    const { statusCode, statusText } = res.data.data;
    const token = await res.data.data.accessToken;
    const refreshToken = await res.data.data.refreshToken;
    if (token) {
      cookies().set("token", token);
      cookies().set("refresh-token", refreshToken.token);
      revalidatePath("dashboard");
      redirect("/dashboard");
    }
    return fetchResponse2(statusCode, "success", statusText);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const {
          data: { statusCode, message },
          status,
          statusText,
        } = error.response;
        return fetchResponse2(
          statusCode || status,
          "error",
          message || statusText
        );
      }
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message in the actions.ts file handleSignIn() server action"
      );
    }
  }
}

export async function refreshTokenIfExpired(): Promise<
  IFetchResponse2<[]> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const FD = new FormData();
    const token = cookies().get("token")?.value;
    const refreshToken = cookies().get("refresh-token")?.value;
    if (token && refreshToken) {
      FD.append("RefreshToken", refreshToken);
      FD.append("AccessToken", token);
      const res = await apiClient.post(
        endpoints.authentication.refreshToken + 9,
        FD
      );
      const { status } = res;
      if (status === 200) {
        console.log(res.data);
        cookies().set("token", res.data.AccessToken);
        cookies().set("refresh-token", res.data.refreshToken);
        return fetchResponse2(
          status,
          "success",
          "the current token has expired and refreshed with a new one"
        );
      }
      return fetchResponse2(status, "success", "the current token is valid");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { status, statusText } = error?.response as AxiosResponse;
      fetchResponse2(status, "error", statusText);
    } else {
      console.log(error);
      return fetchResponse2(400, "error", "this message should be edited");
    }
  }
}

export async function isTokenValid(): Promise<IFetchResponse2<[]> | undefined> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const token = cookies().get("token")?.value;
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = await apiClient.get(
        endpoints.authentication.validateToken + "?AccessToken=" + token
      );
      return fetchResponse2(
        status || statusCode,
        "success",
        message || "token is valid"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return fetchResponse2(
        error.response?.status as number,
        "error",
        error.response?.statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from isTokenValid() server action"
      );
    }
  }
}

//----------------------------
// Data endpoints
//----------------------------
// get all the instructors data
export async function getAllUsers(): Promise<
  IFetchResponse2<IUser> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const token = cookies().get("token")?.value;
    if (token) {
      const {
        data: { statusCode, data, message },
      } = await apiClient.get(endpoints.users.all);
      revalidatePath("/dashboard/users");
      return fetchResponse2(statusCode, "success", message, data);
    } else {
      console.log(
        "the token not found in the getAllUsers function from actions.tsx"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { statusCode, errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(
        status || statusCode,
        "error",
        statusText || errors.id.id[0]
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message for the getAllUsers() server action"
      );
    }
  }
}

//get the loged in user
export async function getCurrentUser(): Promise<
  IFetchResponse2<IUser> | undefined
> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, message, data },
      } = await apiClient.get(endpoints.users.current);
      console.log(data);
      return fetchResponse2(
        status || statusCode,
        "success",
        message || statusText,
        data
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      console.log(error.response?.data);
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = error.response as AxiosResponse;
      console.log(status, statusText, statusCode, message);
      return fetchResponse2(
        status || statusCode,
        "error",
        message || statusText
      );
    } else {
      console.log("current user endpoint function errro", error);
      return fetchResponse2(
        400,
        "error",
        "edit this message in the getCurrentUser server action"
      );
    }
  }
}

export async function getUserById(
  id: number
): Promise<IFetchResponse<IUser | null | undefined> | undefined> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const {
      status,
      statusText,
      data: { statusCode, message, data },
    } = await apiClient.get(endpoints.users.id + id);
    return fetchResponse(status || statusCode, message || statusText, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { statusCode, message, data },
      } = error.response as AxiosResponse;
      return fetchResponse(status || statusCode, message || statusText, data);
    }
    console.log("get user by id error", error);
  }
}

export async function updateUser(
  data: IUser
): Promise<IFetchResponse2<undefined> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const FD = appendToFormData(data);
  try {
    if (token) {
      const res = await apiClient.put(endpoints.users.update, FD);
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = res;
      return fetchResponse2(
        status || statusCode,
        "success",
        "the user updated successfully"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { statusCode, message, errors },
      } = error.response as AxiosResponse;
      console.log(errors);
      return fetchResponse2(
        status || statusCode,
        "error",
        errors || message || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from updateUser function action"
      );
    }
  }
}

export async function createUser(
  data: FormData
): Promise<IFetchResponse2<undefined> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const {
      status,
      statusText,
      data: { statusCode, message },
    } = await apiClient.post(endpoints.users.create, data);
    return fetchResponse2(
      status || statusCode,
      "success",
      "user created successfully"
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.errors);
      const {
        status,
        statusText,
        data: { statusCode, message, errors },
      } = error.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || message);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from updateUser function action"
      );
    }
  }
}

export async function deleteUser(
  id: number
): Promise<IFetchResponse2<[]> | undefined> {
  try {
    const token = cookies().get("token")?.value;
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const {
      status,
      statusText,
      data: { statusCode, message },
    } = await apiClient.delete(endpoints.users.delete + "?id=" + id);
    revalidatePath("users");
    return fetchResponse2(
      status || statusCode,
      "success",
      "the user has deleted successfully"
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || statusText);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from deleteUser() server action"
      );
    }
  }
}

export async function resetUserPassword(
  data: YupUserResetPassword
): Promise<IFetchResponse2<[]> | undefined> {
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
    console.log(res);
    return fetchResponse2(
      successResponse.statusCode,
      "success",
      "The user password updated successfully"
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      const {
        data: { status, message },
        status: anotherStatus,
        statusText,
      } = error?.response as AxiosResponse;
      return fetchResponse2(
        status || anotherStatus,
        "error",
        message || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message resetUserPassword"
      );
    }
  }
}

export async function getAllRoles(): Promise<
  IFetchResponse<IRole[]> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  try {
    const {
      status,
      statusText,
      data: { statusCode, message, data },
    } = await apiClient.get(endpoints.authorization.roles.all);
    console.log(data);
    return fetchResponse(status || statusCode, message, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { status: anotherStatus, errors },
      } = error.response as AxiosResponse;
      console.log(error.response?.data);
      return fetchResponse(status || anotherStatus, JSON.stringify(errors));
    } else {
      console.log("get roles error", error);
    }
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

export async function getAllInstructors(): Promise<
  IFetchResponse2<IInstructor> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = cookies().get("token")?.value;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, data, message },
      } = await apiClient.get(endpoints.instructors.all);
      return fetchResponse2(
        status || statusCode,
        "success",
        message || statusText,
        data
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { status: anotherStatus, errors },
      } = error.response as AxiosResponse;
      console.log(error?.response);
      console.log(error.response?.data);
      return fetchResponse2(
        status || anotherStatus,
        "error",
        errors || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message from getAllInstructors() server action"
      );
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

export async function deleteInstructor(
  id: number
): Promise<IFetchResponse2<[]> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const {
      status,
      statusText,
      data: { statusCode, message },
    } = await apiClient.delete(endpoints.instructors.delete + id);
    revalidatePath("instructors");
    return fetchResponse2(
      status || statusCode,
      "success",
      message || "instructor deleted successfully"
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || statusText);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from deleteInstructors() server action"
      );
    }
  }
}

export async function getAllDepartments(): Promise<
  IFetchResponse2<IDepartment> | undefined
> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, data, message },
      } = await apiClient.get(endpoints.departments.all);
      console.log(data);
      return fetchResponse2(
        status || statusCode,
        "success",
        message || statusText,
        data
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { status: anotherStatus, errors },
      } = error.response as AxiosResponse;
      console.log(error?.response);
      console.log(error.response?.data);
      return fetchResponse2(
        status || anotherStatus,
        "error",
        errors || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message from getAllInstructors() server action"
      );
    }
  }
}
export async function deleteDepartment(
  id: number
): Promise<IFetchResponse2<[]> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = await apiClient.delete(endpoints.departments.delete + id);
      revalidatePath("departments");
      return fetchResponse2(
        status || statusCode,
        "success",
        message || "departement deleted"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || statusText);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from deleteDepartments() server action"
      );
    }
  }
}

export async function getAllStudents(): Promise<
  IFetchResponse2<IStudent> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = cookies().get("token")?.value;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, data, message },
      } = await apiClient.get(endpoints.students.all);
      console.log(data);
      return fetchResponse2(
        status || statusCode,
        "success",
        message || statusText,
        data
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { status: anotherStatus, errors },
      } = error.response as AxiosResponse;
      console.log(error?.response);
      console.log(error.response?.data);
      return fetchResponse2(
        status || anotherStatus,
        "error",
        errors || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message from getAllInstructors() server action"
      );
    }
  }
}
export async function deleteStudent(
  id: number
): Promise<IFetchResponse2<[]> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = await apiClient.delete(endpoints.students.delete + id);
      revalidatePath("students");
      return fetchResponse2(
        status || statusCode,
        "success",
        message || "student deleted successfylly"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || statusText);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from deleteStudents() server action"
      );
    }
  }
}
export async function getAllSubjects(): Promise<
  IFetchResponse2<ISubject> | undefined
> {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${
    cookies().get("token")?.value
  }`;
  const token = cookies().get("token")?.value;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, data, message },
      } = await apiClient.get(endpoints.subjects.all);
      console.log(data);
      return fetchResponse2(
        status || statusCode,
        "success",
        message || statusText,
        data
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { status: anotherStatus, errors },
      } = error.response as AxiosResponse;
      console.log(error?.response);
      console.log(error.response?.data);
      return fetchResponse2(
        status || anotherStatus,
        "error",
        errors || statusText
      );
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this error message from getAllInstructors() server action"
      );
    }
  }
}

export async function deleteSubject(
  id: number
): Promise<IFetchResponse2<[]> | undefined> {
  const token = cookies().get("token")?.value;
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    if (token) {
      const {
        status,
        statusText,
        data: { statusCode, message },
      } = await apiClient.delete(endpoints.subjects.delete + id);
      revalidatePath("subjects");
      return fetchResponse2(
        status || statusCode,
        "success",
        "Deleted successfully"
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const {
        status,
        statusText,
        data: { errors },
      } = error?.response as AxiosResponse;
      return fetchResponse2(status, "error", errors || statusText);
    } else {
      return fetchResponse2(
        400,
        "error",
        "edit this message from deleteSubjects() server action"
      );
    }
  }
}
