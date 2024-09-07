"use server";
// import Cookies from "js-cookie";
import axios from "axios";
import { baseURL, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${cookies().get("token")?.value}`,
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
      cookies().set("token", token);
      cookies().set("refresh-token", refreshToken.token);
      console.log("token saved");
      revalidatePath("/dashboard");
      redirect("/dashboard");
    }
  } catch (error) {
    if (isRedirectError(error)) {
      console.log("success");
      throw error;
    }
    if (error.response.data.message !== undefined) {
      console.log("error");
      return { message: error?.response.data.message };
    }
    // if there is an error with respond and you can display the data into the login form like username not exixt or wrong password
  }
}

export async function renewTokenIfNeeded() {
  try {
    const FD = new FormData();
    const token = cookies().get("token")?.value;
    const refreshToken = cookies().get("refresh-token")?.value;
    if (token && refreshToken) {
      FD.append("RefreshToken", refreshToken);
      FD.append("AccessToken", token);

      const res = await apiClient.post(endpoints.auth.refreshToken, FD);
      const { status } = res;
      console.log(status);
      if (status === 204) return res;
      if (status !== 204) {
        cookies().set("token", res.data.AccessToken);
        cookies().set("refresh-token", res.data.refreshToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function isTokenValid() {
  try {
    const token = cookies().get("token")?.value;
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
    const token = cookies().get("token")?.value;
    if (token) {
      const res = await apiClient.get(endpoints.users.all, {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      });
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
  const token = cookies().get("token")?.value;
  try {
    if (token) {
      const res = await apiClient.get(endpoints.users.current);
      return res;
    }
  } catch (error) {
    console.error("current user endpoint function errro", error);
  }
}

export async function getAllInstructors() {
  const token = cookies().get("token")?.value;
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
  const token = cookies().get("token")?.value;
  try {
    // if (token) {
    const res = await apiClient.get(endpoints.departments.all);
    console.log(res.data.data);
    return res;
    // }
    // return null;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllStudents() {
  const token = cookies().get("token")?.value;
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
  const token = cookies().get("token")?.value;
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
