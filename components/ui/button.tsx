type Props = {
  type: "button" | "reset" | "submit" | undefined;
  value: string;
  event: any;
};

export default function Button(props: Props) {
  let { type, value, event } = props;
  type = type || "submit";
  value = value || "button";
  event = event || '() => ""';
  return (
    <button
      {...props}
      className="bg-primary-400 hover:bg-primary-500 text-white text-sm md:text-base p-2 col-span-full col-start-1 rounded first-letter:capitalize"
    >
      {value}
    </button>
  );
}
