import { Cloud, Upload, UploadCloud } from "lucide-react";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {};
type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Props;
export default function FileInput(props: InputProps) {
  return (
    <div className="group relative border border-blue-500 border-dashed h-[150px] md:h-[200px] w-full bg-blue-50 hover:bg-blue-100/60 rounded flex items-center justify-center cursor-pointer">
      <span className="flex items-center justify-center gap-2 group-hover:text-blue-500 text-sm md:text-base">
        <UploadCloud />
        Upload Image
      </span>
      <input
        type="file"
        {...props}
        className="absolute top-0 left-0 w-full h-full border border-black opacity-0 cursor-pointer"
      />
    </div>
  );
}
