// "use client";

import Image from "next/image";
import Link from "next/link";

type LogoType = {
  height?: number;
  width?: number;
  hasText?: boolean;
  textIsWrap?: boolean;
  redirect?: string;
};

export default function LogoLayout(props: LogoType) {
  let { height, width, hasText, textIsWrap } = props;

  // default values
  height = height || 40;
  width = width || 40;
  hasText = hasText || true;
  textIsWrap = textIsWrap || false;
  console.log(hasText);
  return (
    <Link href={"/"} className="flex items-center gap-2 h-full w-full">
      <Image
        src={"/assets/logo.svg"}
        height={height}
        width={width}
        alt="school system managment"
      />
      {hasText && (
        <p className="font-medium text-base md:text-lg">
          School {textIsWrap && <br />} Ment
        </p>
      )}
    </Link>
  );
}
