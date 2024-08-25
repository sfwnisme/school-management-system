"use client";
import Cookies from "js-cookie";
// ------------------------
// Client Cookies set up
// ------------------------

// set cookie
export const sCookie = (key: string, value: string) => Cookies.set(key, value);

// get cookie
export const gCookie = (key: string) => Cookies.get(key);

// delete cookie
export const rCookie = (key: string) => Cookies.remove(key);

// set termprory cookie
// export const tCookie = (key: string, value: string, expiration: number) =>
//   Cookies.set(key, value, { expires: expiration, path: "" });

// ------------------------
// token cookie
// ------------------------
export const TOKEN = Cookies.get("token");
export const REMOVETOKEN = rCookie("token");
console.log(TOKEN);

/**NOTES
 * this file should help you organize the cookies procedures
 * note that these fucntions using js-cookie for the clien
 * components not server components
 */
