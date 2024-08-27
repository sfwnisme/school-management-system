"use server";
// import Cookies from "js-cookie";
import axios from "axios";
import { baseURL, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${cookies().get("token")?.value}`,
  },
});

export async function handleSignIn(
  username: string,
  password: string,
  remeberMe: boolean
) {
  // username: admin
  // pass: Aa@123.123
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // the backend request uses form method
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
    if (error.response.data.message) {
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
    FD.append("RefreshToken", refreshToken);
    FD.append("AccessToken", token);
    if (token && refreshToken) {
      const res = await apiClient.post(endpoints.auth.refreshToken, FD);
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function isTokenValid() {
  try {
    const token = cookies().get("token")?.value;
    console.log("success", token);
    const params = {
      AccessToken: token,
    };
    const res = await apiClient.get(
      endpoints.auth.validateToken + "?AccessToken=" + token
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

// get all the instructors data
export async function getAllUsers() {
  try {
    const token = cookies().get("token")?.value;
    if (token) {
      const res = await apiClient.get(endpoints.users.users, {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      });
      console.log("users", res?.data.data);
      return res;
    } else {
      console.log(
        "the token not found in the getAllUsers function from actions.tsx"
      );
    }
    // } else {
    // return console.log("getAllUsers", "there is no token");
    // }
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

// logout
// export async function handleLogout() {
//   cookies().delete("token");
// }
