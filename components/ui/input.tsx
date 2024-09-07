import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  styles?: string;
  variant?: "initial" | "success" | "danger";
  sze?: "initial" | "sm" | "lg";
  // type?: string;
};
type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  Props;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const variants = {
    initial:
      "border-gray-500 text-gray-500 placeholder:text-gray-400 outline-gray-200",
    success:
      "border-green-700 text-green-500 placeholder:text-green-400 outline-green-200 ",
    danger:
      "border-red-700 text-red-500 placeholder:text-red-400 outline-red-200 ",
  };

  const sizes = {
    initial: "text-xs px-4 py-2 min-h-[40px] w-full",
    sm: "text-xs px-4 py-1 min-h-[30px] w-full",
    lg: "text-sm px-4 p-2 min-h-[50px] w-full",
  };

  const focusVisible = "focus-visible:outline outline-[3px] outline-gray-200";

  const currentStatus = variants[props?.variant || "initial"];
  // const currentStatus = variants[variant || "initial"];

  const currentSize = sizes[props?.sze || "initial"];
  // const currentSize = sizes[sze || "initial"];

  return (
    <div>
      <input
        {...props}
        ref={ref}
        className={` bg-transparent border rounded text-black col-span-full w-full ${currentSize} ${currentStatus} ${focusVisible} ${props?.styles}`}
      />
    </div>
  );
});
export default Input;

Input.displayName = "Input";
// ?why this snippet:
// Description. The displayName property, if present, may be preferred by
// consoles and profilers over the name property to be displayed
// as the name of a function. Among browsers, only the Firefox
// console utilizes this property. React devtools also
// use the displayName property when displaying the component tree
// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName

/**NOTES
 * I named it sze instead of size becuase typescript said it's booked term
 * ?SOS: this AI prompt helped me in ChatGPT 4o mini to make my Input component compatable with react-hook-form library
 *    I'm using react hook form to handle the froms and I have and input component named <Input/>
      I passed {...register("username")} to the input but it did not work.
      how can I solve this issue?
 * why I added display name

 */
