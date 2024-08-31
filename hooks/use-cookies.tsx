import { cookies } from "next/headers";

export function useGetCookie(key: string) {
  return cookies().get(key)?.value;
}

export function setCookie(key: string, value: string) {
  cookies().set(key, JSON.stringify(value));
  return { status: "token saved successfully" };
}

export function removeCookie(key: string) {
  cookies().delete(key);
  return { status: "cookie removed" };
}
