import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const isAuth = Cookies.get("token");

// status object
// const status = {
//   idle
// }

// handle logout
export function handleLogout() {
  Cookies.remove("token");
  window.location.reload();
  window.location.href = "/";
}
