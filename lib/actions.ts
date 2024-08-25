"use server";
// import Cookies from "js-cookie";
import axios from "axios";
import { baseURL, endpoints } from "./endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const http = axios.create({
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
    const res = await http.post(endpoints.auth.signin, FD);

    const token = await res.data.data.accessToken;
    const refreshToken = await res.data.data.refreshToken;
    if (token) {
      cookies().set("token", token, { path: "/", domain: "localhost" });
      cookies().set("refresh-token", JSON.stringify(refreshToken));
      console.log("token saved");
    }
    // if (remeberMe) {
    //   // if the user checked on remember me the tokens saved
    //   // for the initial timestamp form the backend
    // } else {
    //   // if the user checked 'don't remeber me' this function works
    //   const timestamp = 30 * 60;
    //   cookies().set("token", res?.data?.data?.token, {
    //     expires: 1,
    //     path: "",
    //   });
    // }
    console.log("successfully logined");
    // revalidatePath('/')
    // window.location.href = "/dashboard";
    // permanentRedirect("/dashbaord");
  } catch (error) {
    console.log(error);
  }
  // revalidatePath("/dashboard");
  redirect("/dashboard");
}

// // handle logout
// export async function handleLogout() {
//   cookies().delete("token");
//   revalidatePath("/login");
//   redirect("/login");
//   // window.location.reload();
//   // window.location.href = "/login";
// }

// get all the instructors data
export async function getAllUsers() {
  try {
    const token = cookies().get("token")?.value;
    if (token) {
      const res = await axios.get(baseURL + endpoints.users.users, {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      });
      console.log("users", res);
      return res;
    } else {
      console.log(
        "the token not found in the getAllUsers function from actions.tsx"
      );
    }
    // } else {
    // return console.log("getAllUsers", "there is no token");
    // }
  } catch (error) {
    console.log(error);
  }
}

// logout
// export async function handleLogout() {
//   cookies().delete("token");
// }
console.log("get js-cookies token", cookies().get("token")?.value);
