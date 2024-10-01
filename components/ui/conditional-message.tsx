import { IApiResponseReturn } from "@/definitions";
import React from "react";
import Message from "./message";

type Props = IApiResponseReturn<undefined>;

/**
 * this component reduce the duplicated code
 * @param success - success message could be undefined
 * @param error - error message could be undefined
 * @param status - status of the current response could be 'idle'
 * @returns
 */
export default function ConditionalMessage({ success, error, status }: Props) {
  return (
    <>
      {status !== "idle" && (
        <div className="col-span-full">
          <Message variant={success ? "success" : "danger"}>
            {success || error}
          </Message>
        </div>
      )}
    </>
  );
}
