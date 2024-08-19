import Image from "next/image";

type LogoType = {
  height?: number;
  width?: number;
  hasText?: boolean;
  textIsWrap?: boolean;
};

export default function LogoLayout(props: LogoType) {
  let { height, width, hasText, textIsWrap } = props;

  // default values
  height = height || 40;
  width = width || 40;
  hasText = hasText || true;
  textIsWrap = textIsWrap || false;
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
}
