"use client";
import { http } from "./actions";
import { endpoints } from "./endpoints";

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
      // document.cookie = `token=${token}`;
      // document.cookie = `refresh-token=${JSON.stringify(refreshToken)}`;
      console.log("token saved");
    }

    console.log("successfully logined");
    // revalidatePath('/')
    // window.location.href = "/dashboard";
    // permanentRedirect("/dashbaord");
    // revalidatePath("/dashboard");
    // redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
  // revalidatePath("/dashboard");
  // redirect("/dashboard");
}
