import {
  IApiResponseReturn,
  IFetchResponse,
  IFetchResponse2,
} from "@/definitions";
import React from "react";
import Message from "./message";
import { array } from "yup";

type Props = IFetchResponse2<[]>;
export default function FetchMessage({ isSuccess, isError, message }: Props) {
  let arrayMessage: string[] = [];
  let stringMessage = "";
  if (Array.isArray(message)) {
    arrayMessage = message;
  } else if (typeof message === "string") {
    stringMessage = message;
  }

  const arrayMessageJsx = (
    <ul className="flex flex-col">
      {arrayMessage.length !== 0 &&
        arrayMessage.map((msg) => (
          <li key={msg}>
            <Message variant={isSuccess ? "success" : "danger"} key={msg}>
              {msg}
            </Message>
          </li>
        ))}
    </ul>
  );
  const stringMessageJsx = (
    <Message variant={isSuccess ? "success" : "danger"}>
      {message as React.ReactNode}
    </Message>
  );

  const stringOrArrayMessageJsx =
    arrayMessage.length !== 0 ? arrayMessageJsx : stringMessageJsx;

  return (
    <>
      {message && (
        <div className="col-span-full">{stringOrArrayMessageJsx}</div>
      )}
    </>
  );
}
