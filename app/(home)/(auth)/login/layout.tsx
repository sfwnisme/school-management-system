import IsAuth from "@/lib/is-auth";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex items-center justify-center h-full">
      <IsAuth route="public">
        {children}
      </IsAuth>
    </div>
  );
}
