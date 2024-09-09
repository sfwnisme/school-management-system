"use server";
import axios from "axios";
import { baseURL, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getCookie, setCookie } from "cookies-next";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${getCookie("token", { cookies })}`,
    // "Accept-language": "ar-EG",
  },
});

//----------------------------
// Authentication endpoints
//----------------------------
export async function handleSignIn(username: string, password: string) {
  const FD: FormData = new FormData();
  FD.append("UserName", username);
  FD.append("Password", password);
  try {
    const res = await apiClient.post(endpoints.auth.signin, FD);

    const token = await res.data.data.accessToken;
    const refreshToken = await res.data.data.refreshToken;
    if (token) {
      setCookie("token", token, { cookies });
      setCookie("refresh-token", refreshToken.token, { cookies });
      console.log("token saved");
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  } catch (error) {
    if (isRedirectError(error)) {
      console.log("success");
      throw error;
    }
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log("login error", errorMessage);
        return { message: errorMessage };
      }
    }
  }
}

export async function renewTokenIfNeeded() {
  try {
    const FD = new FormData();
    const token = getCookie("token", { cookies });
    const refreshToken = getCookie("refresh-token");
    if (token && refreshToken) {
      FD.append("RefreshToken", refreshToken);
      FD.append("AccessToken", token);

      const res = await apiClient.post(endpoints.auth.refreshToken, FD);
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
  try {
    const token = getCookie("token", { cookies });
    if (token) {
      const res = await apiClient.get(
        endpoints.auth.validateToken + "?AccessToken=" + token
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
  try {
    const token = getCookie("token", { cookies });
    if (token) {
      const res = await apiClient.get(endpoints.users.all);
      revalidatePath("/dashboard/users");
      revalidateTag("/dashboard/users");
      return res;
    } else {
      console.log(
        "the token not found in the getAllUsers function from actions.tsx"
      );
    }
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

//get the loged in user
export async function getCurrentUser() {
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.users.current);
      console.log(res.data.data.userName);
      console.log(res.data.data.fullName);
      console.log(res.data.data);
      return res;
    }
  } catch (error) {
    console.error("current user endpoint function errro", error);
  }
}

export async function getAllInstructors() {
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.instructors.all);
      console.log("instructors", res?.data.data);
      return res;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllDepartments() {
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.departments.all);
      console.log(res.data.data);
      return res;
    }
    // return null;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllStudents() {
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(endpoints.students.all);
      console.log(res.data.data);
      return res;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllSubjects() {
  const token = getCookie("token", { cookies });
  try {
    if (token) {
      const res = await apiClient.get(
        endpoints.subjects.getSubjectsWithItsDepartments
      );
      console.log(res.data.data);
      return res;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}
