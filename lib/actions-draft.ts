// "use server";

// import axios from "axios";
// import { cookies } from "next/headers";
// import { baseURL, endpoints } from "./endpoints";
// import { permanentRedirect, redirect } from "next/navigation";

// export async function handleSignIn(
//   username: string,
//   password: string,
//   remeberMe: boolean
// ) {
//   // username: admin
//   // pass: Aa@123.123
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   // the backend request uses form method
//   const FD: FormData = new FormData();
//   FD.append("UserName", username);
//   FD.append("Password", password);
//   try {
//     const res = await axios.post(baseURL + endpoints.auth.signin, FD);

//     if (remeberMe) {
//       // if the user checked on remember me the tokens saved
//       // for the initial timestamp form the backend
//       const token = res?.data?.data?.accessToken;
//       const refreshToken = res?.data?.data?.refreshToken;
//       cookies().set("token", token);
//       cookies().set("refresh-token", JSON.stringify(refreshToken));
//     } else {
//       // if the user checked 'don't remeber me' this function works
//       const timestamp = 30 * 60;
//       cookies().set("token", res?.data?.data?.token, {
//         expires: 1,
//         path: "",
//       });
//     }
//     // revalidatePath('/')
//     permanentRedirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// }

// // get all the instructors data
// export async function getAllInstructors() {
//   try {
//     const res = await axios.get(
//       "http://schoolmanagmentsystem.runasp.net/Api/V1/Instructor/GetAllInstructors",
//       {
//         headers: {
//           Authorization: `Bearer ${cookies().get("token")?.value}`,
//         },
//       }
//     );
//     console.log("instructors", res);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }

// // logout
// // export async function handleLogout() {
// //   cookies().delete("token");
// // }
// console.log("get js-cookies token", cookies().get("token")?.value);
