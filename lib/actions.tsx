// "use server";

import Cookies from "js-cookie";
import axios from "axios";
import { baseURL, endpoints, http } from "./endpoints";
import { rCookie, sCookie, TOKEN } from "./cookes";

export async function handleSignIn(
  username: string,
  password: string,
  remeberMe: boolean
) {
  // username: admin
  // pass: Aa@123.123
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // the backend request uses form method
  const FD: FormData = new FormData();
  FD.append("UserName", username);
  FD.append("Password", password);
  try {
    const res = await http.post(endpoints.auth.signin, FD);

    const token = await res?.data?.data?.accessToken;
    const refreshToken = await res?.data?.data?.refreshToken;
    Cookies.set("token", token);
    Cookies.set("refresh-token", JSON.stringify(refreshToken));
    // if (remeberMe) {
    //   // if the user checked on remember me the tokens saved
    //   // for the initial timestamp form the backend
    // } else {
    //   // if the user checked 'don't remeber me' this function works
    //   const timestamp = 30 * 60;
    //   Cookies.set("token", res?.data?.data?.token, {
    //     expires: 1,
    //     path: "",
    //   });
    // }
    console.log("successfully logined");
    // revalidatePath('/')
    // redirect("/dashbaord");
    window.location.href = "/dashboard";
    // permanentRedirect("/dashbaord");
  } catch (error) {
    console.log(error);
  }
}

// handle logout
export function handleLogout() {
  Cookies.remove("token");
  // window.location.reload();
  window.location.href = "/";
}

// get all the instructors data
export async function getAllUsers() {
  try {
    // if (Cookies.get("token") !== "") {
    const res = await http.get(endpoints?.users?.users);
    console.log("users", res);
    return res;
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
console.log("get js-cookies token", Cookies.get("token"));
