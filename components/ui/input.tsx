import React from "react";

type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "date"
  | "tel"
  | "url"
  | "color"
  | "search"
  | "range"
  | "hidden"
  | "reset"
  | "submit"
  | "button";

type InputValue = string | number | readonly string[];

type Props = {
  type: InputType;
  name: string;
  placeholder?: string;
  value?: InputValue;
};

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="border-2 border-primary-300 rounded p-2 focus:border-primary-500 min-h-[40px] text-black col-span-full"
    />
  );
}
