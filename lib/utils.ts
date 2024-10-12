// import { deleteCookie, hasCookie } from "cookies-next";

import {
  FormDataObjectType,
  IFetchResponse2,
} from "@/definitions";

export const appendToFormData = (data: FormDataObjectType<any>): FormData => {
  const FD = new FormData();
  const objectToArray = Object.entries(data);
  for (const [key, value] of objectToArray) {
    if (key === "image") {
      FD.append(key, value[0]);
    } else {
      FD.append(key, value);
    }
  }
  return FD;
};

/** NOTES
 * !fetchResponse(statusCode, isSuccess, isError, message, data)
 * !you will handle the [data, isEmpty] only
 ** Explain
 * statusCode indicating the response number
 * isSuccess indictating the success
 * isError indictating the error
 * isEmtpy indicating the data array, or object if it's empty. It helps me to do the check it the data emtpy on time for all data
 * message indicating the client message
 * data indicating the returned data
 ** Rules:
 * this function will handle the logic of checking if emtpy the data either array or object
 * you do not need to pass the data to the function, it will handle it automatically and return it as emtpy array
 *
 *
 * @param statusCode
 * @param isSuccess
 * @param isError
 * @param message
 * @param data
 * @returns
 */
export function fetchResponse2<T>(
  statusCode: number,
  status: "success" | "error",
  message: string = "",
  data?: IFetchResponse2<T>["data"]
): IFetchResponse2<T> {
  let initialObject: IFetchResponse2<T> = {
    data: [], // default value is array
    isEmpty: false,
    isSuccess: false,
    isError: true,
    // isAuth: true, // initially true to check either auth or not
    isAuth: false, // initially true to check either auth or not
    message:
      "this message is the default message of the response returned schema",
  };
  initialObject.isSuccess = Boolean(status === "success");
  initialObject.isError = Boolean(status === "error");
  initialObject.message = message ?? initialObject.message;

  console.log(initialObject.isSuccess);
  console.log(initialObject.isError);

  // check if the data is array and if the data is empty array or not
  // check if the data is object and if the data is empty object or not
  if (Array.isArray(data)) {
    if (data.length === 0) {
      initialObject.data = [];
      initialObject.isEmpty = true;
    } else {
      initialObject.data = data;
      initialObject.isEmpty = false;
    }
  } else if (typeof data === "object" && data !== null) {
    initialObject.isEmpty = Boolean(Object.keys(data).length === 0);
    if (Object.keys(data).length === 0) {
      initialObject.data = {};
      initialObject.isEmpty = true;
    } else {
      initialObject.data = data;
      initialObject.isEmpty = false;
    }
  }

  // check if the message returned as object from the response
  if (typeof message === "object" && message !== null) {
    initialObject.message = responseErrorsObjectToArray(message);
  }

  if (status === "success") {
    initialObject.isSuccess = true;
    initialObject.isError = false;
    initialObject.isAuth = true
  } else if (status === "error") {
    if (statusCode === 401) {
      console.log(statusCode)
      initialObject.isSuccess = false;
      initialObject.isError = true;
      initialObject.isAuth = false
    } else {
      initialObject.isSuccess = false;
      initialObject.isError = true;
    }
  }
  console.log(initialObject);

  return initialObject;
}

export function responseErrorsObjectToArray(obj: { [key: string]: string[] }) {
  console.log("object to array function from utils.ts", obj);
  let arr = [];
  if (typeof obj === "object" && obj !== null) {
    if (Object.keys(obj).length !== 0) {
      let objToArr = Object.entries(obj);
      console.log(objToArr);
      for (const [key, value] of objToArr) {
        arr.push(...value);
      }
    }
  }
  console.log(arr);
  return arr;
}
