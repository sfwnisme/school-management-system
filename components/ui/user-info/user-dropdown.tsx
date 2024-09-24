import { getCurrentUser } from "@/lib/actions";
import { userAvatarNavlinks } from "@/lib/data";
import Link from "next/link";
import Badge from "../badge";

export default async function UserDropdown() {
  const currentUser = await getCurrentUser();
  const user = currentUser?.data.data;

  const shortLinks = userAvatarNavlinks.protected.map((link) => (
    <Link
      href={link?.href}
      className={` bg-white hover:bg-gray-100 duration-150 text-gray-700 w-full text-sm sm:text-base font-normal p-1 cursor-pointer rounded`}
      key={link?.title}
    >
      {link?.title}
    </Link>
  ));

  const userDataContainer =
    user?.name !== undefined ? (
      <div className="mb- flex items-start gap-1 w-full bg-gray-100 rounded p-1">
        <div className="flex-1">
          <p className="capitalize text-sm text-gray-600">{user?.name}</p>
          <p className="capitalize text-xs text-gray-600">{user?.username}</p>
          {/* <Badge>{user?.role}</Badge> */}
        </div>
      </div>
    ) : null;

  let content = (
    <>
      {shortLinks}
      {userDataContainer}
    </>
  );

  return <>{content}</>;
}
