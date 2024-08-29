import Image from "next/image";
import React from "react";

type Props = {
  about?: string;
  image?: string;
  name?: string;
  bg?: string;
  color?: string;
};

export default function Avatar(props: Props) {
  const about = props?.about || "user's avatar";
  const image = props?.image || "";
  const name = props?.name || "user name";
  const bg = props?.bg || "bg-gray-500";
  const color = props?.color || "text-gray-100";
  const settings = `${bg + " " + color}`;

  // get the first letters fo the user full name to display it instead of the image
  const firstNameLetter = name.split("")[0];
  const secondNameLetter = name.length >= 1 && name.split(" ")[1][0];

  const userFirstLetters = `${firstNameLetter + secondNameLetter}`;

  // check if there is an image
  const isImage = Boolean(image.trim());

  const displayImageOrLetterAvatar = (
    <div
      className={`size-12 rounded-md shadow-md shadow-gray-200 cursor-pointer select-none ${settings}`}
    >
      {isImage ? (
        <Image
          src={image}
          alt={name + " " + about}
          height={40}
          width={40}
          className="size-full"
        />
      ) : (
        <p className="size-full flex items-center justify-center uppercase">
          {userFirstLetters}
        </p>
      )}
    </div>
  );

  return <div {...props}>{displayImageOrLetterAvatar}</div>;
}
