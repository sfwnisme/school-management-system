import Loading from "@/components/ui/loading/loading";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout(props: Props) {
  return (
    <div>
      <Suspense fallback={<Loading />}>{props?.children}</Suspense>
    </div>
  );
}
