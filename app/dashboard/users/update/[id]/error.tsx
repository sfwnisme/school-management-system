"use client"; // Error boundaries must be Client Components

import Button from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(props.error);
  }, [props.error]);

  console.log(props);
  console.log(props.error?.stack);

  return (
    <div className="grid place-items-center place-content-center gap-5">
      <h1 className="text-8xl text-blue-500 bold leading">Oops</h1>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => props.reset()
        }
      ></button>
      <div className="mx-auto mt-2 text-red-500 text-start bg-red-100 border-2 border-red-300 min-h-40 w-full md:w-8/12 rounded p-4 max-sm:overflow-x-scroll">
        Try again {JSON.stringify(props.error.stack)}
      </div>
      <Button onClick={() => props.reset()} variant="danger">
        reset
      </Button>
    </div>
  );
}
