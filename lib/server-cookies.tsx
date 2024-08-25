// ------------------------
// Server Cookies set up
// ------------------------

import { cookies } from "next/headers";

// set cookie
// export const sCookie = (key: string, value: string) =>
//   cookies().set(key, value);

// // get cookie
// export const gCookie = (key: string) => cookies().get(key);

// // delete cookie
// export const rCookie = (key: string) => cookies().delete(key);

// // set termprory cookie
// // export const tCookie = (key: string, value: string, expiration: number) =>
// //   Cookies.set(key, value, { expires: expiration, path: "" });

// ------------------------
// token cookie
// ------------------------
// export const REMOVETOKEN = rCookie("token");

export const TOKEN = cookies().get("token")?.value;
console.log(TOKEN);

