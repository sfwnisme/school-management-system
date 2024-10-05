// import { deleteCookie, hasCookie } from "cookies-next";

import {
  FormDataObjectType,
  IApiResponseReturn,
  IClientResponse,
  IFetchResponse,
  IFetchResponse2,
} from "@/definitions";
import { init } from "next/dist/compiled/webpack/webpack";

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

/**
 * this function helps you return the response message depends on the statusCode
 * @param statusCode the API status code number, ex: 200
 * @param messgae the custom message for the endpoint response
 * @param text the endpoint name, ex: user, post
 * @param action the actions name, ex: deleted
 * @returns
 */
export function responseMessage(
  /**
   * the API status code number, ex: 200
   */
  statusCode: number,
  /**
   * the custom message for the endpoint response
   */
  message: string = "",
  /**
   * the endpoint name, ex: user, post
   */
  text: string = "data",
  /**
   * the actions name, ex: deleted
   */
  action: string = "done"
) {
  switch (statusCode) {
    case 200:
      return {
        message: `[${statusCode}] ${message}` || "ok",
        statusCode,
        success: true,
      };

    case 201:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} created`,
        statusCode,
        success: true,
      };
    case 202:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} accepted`,
        statusCode,
        success: true,
      };
    case 203:
      return {
        message:
          `[${statusCode}] ${message}` ||
          `${statusCode} non authoritative information`,
        statusCode,
        success: true,
      };
    case 204:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} no content`,
        statusCode,
        success: true,
      };
    case 400:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} bad request`,
        statusCode,
        success: false,
      };
    case 401:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} you're unauthorized`,
        statusCode,
        success: false,
      };
    case 402:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} payment required`,
        statusCode,
        success: false,
      };
    case 403:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} forbidden`,
        statusCode,
        success: false,
      };
    case 404:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} not found`,
        statusCode,
        success: false,
      };
    case 405:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} method not allowd`,
        statusCode,
        success: false,
      };
    case 500:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} internal server error`,
        statusCode,
        success: false,
      };
    case 501:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} not implemented`,
        statusCode,
        success: false,
      };
    case 502:
      return {
        message: `[${statusCode}] ${message}` || `${statusCode} bad geteway`,
        statusCode,
        success: false,
      };
    case 503:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} service unavailable`,
        statusCode,
        success: false,
      };
    case 504:
      return {
        message:
          `[${statusCode}] ${message}` || `${statusCode} gateway timeout`,
        statusCode,
        success: false,
      };
    default:
      return {
        message:
          `[${statusCode}] ${message}` ||
          statusCode +
            "status code is not matching, please check the endpoint function status code returns and implement it to the messageResponse function in the `utils.tx`",
        statusCode,
        success: false,
      };
  }
}

interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T | null | undefined;
}

export function apiResponse<T>(
  /**
   * the API status code number, ex: 200
   */
  statusCode: number,
  /**
   * the custom message for the endpoint response
   */
  message: string = "",
  /**
   * data is the response of the try block
   */
  data?: T | undefined
): IApiResponseReturn<T> {
  // const emptyData = Array.isArray(data) && Boolean(data.length === 0);
  // const finalStatus = Array.isArray(data)
  //   ? data.length >= 1
  //     ? "not-empty"
  //     : "empty"
  //   : "error";
  let stat;
  if (Array.isArray(data)) {
    if (data.length >= 1) {
      stat = "not-empty";
    } else {
      stat = "empty";
    }
  } else {
    stat = "error";
  }

  console.log(Array.isArray(data));
  const undefinedData = Boolean(data === undefined);
  switch (statusCode) {
    case 200:
      return {
        data,
        success: `[${statusCode}] ${message}` || "ok",
        error: undefined,
        status: "success",
      };

    case 201:
      return {
        data,
        success: `[${statusCode}] ${message}` || `${statusCode} created`,
        error: undefined,
        status: "success",
      };
    case 202:
      return {
        data,
        success: `[${statusCode}] ${message}` || `${statusCode} accepted`,
        error: undefined,
        status: "success",
      };
    case 203:
      return {
        data,
        success:
          `[${statusCode}] ${message}` ||
          `${statusCode} non authoritative information`,
        error: undefined,
        status: "success",
      };
    case 204:
      return {
        data,
        success: `[${statusCode}] ${message}` || `${statusCode} no content`,
        error: undefined,
        status: "success",
      };
    case 400:
      return {
        data,
        success: undefined,
        status: "error",
        error: `[${statusCode}] ${message}` || `${statusCode} bad request`,
      };
    case 401:
      return {
        data,
        success: undefined,
        status: "error",
        error: `[${statusCode}] ${message}` || `${statusCode} bad request`,
      };
    case 402:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} payment required`,
        success: undefined,
        status: "error",
      };
    case 403:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} forbidden`,
        success: undefined,
        status: "error",
      };
    case 404:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} not found`,
        success: undefined,
        status: "error",
      };
    case 405:
      return {
        data,
        error:
          `[${statusCode}] ${message}` || `${statusCode} method not allowd`,
        success: undefined,
        status: "error",
      };
    case 500:
      return {
        data,
        error:
          `[${statusCode}] ${message}` || `${statusCode} internal server error`,
        success: undefined,
        status: "error",
      };
    case 501:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} not implemented`,
        success: undefined,
        status: "error",
      };
    case 502:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} bad geteway`,
        success: undefined,
        status: "error",
      };
    case 503:
      return {
        data,
        error:
          `[${statusCode}] ${message}` || `${statusCode} service unavailable`,
        success: undefined,
        status: "error",
      };
    case 504:
      return {
        data,
        error: `[${statusCode}] ${message}` || `${statusCode} gateway timeout`,
        success: undefined,
        status: "error",
      };
    default:
      return {
        data,
        error:
          `[${statusCode}] ${message}` ||
          statusCode +
            "status code is not matching, please check the endpoint function status code returns and implement it to the messageResponse function in the `utils.tx`",
        success: undefined,
        status: "error",
      };
  }
}

export function fetchResponse<T>(
  /**
   * the API status code number, ex: 200
   */
  statusCode: number,
  /**
   * the custom message for the endpoint response
   */
  message: string = "",
  /**
   * data is the response of the try block
   */
  data?: T | undefined,
  status: IFetchResponse<T>["status"] = "idle"
): IFetchResponse<T> {
  // check if the data is empty, not empyt or undefined, to use the status value
  // for the conditions in the client components
  // this will help me write less code
  // the status will dynamically be "idle" if you did not pass
  // any status union types, but if you passed a status union type like success or error
  // it'll be the initial value of the status. Why this? it because I need make a logic
  // behinde the client components to avoid the duplication and more code
  //
  if (status === "idle") {
    if (Array.isArray(data)) {
      status = data.length === 0 ? "empty" : "not_empty";
    } else if (typeof data === "object" && data !== null) {
      status = Object.keys(data).length === 0 ? "empty" : "not_empty";
    }
  }

  console.log(status);
  console.log(data);

  // console.log(Array.isArray(data));
  // const undefinedData = Boolean(data === undefined);
  switch (statusCode) {
    case 200:
      return {
        data,
        message: `[${statusCode}] ${message}` || "ok",
        status,
      };

    case 201:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} created`,
        status,
      };
    case 202:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} accepted`,
        status,
      };
    case 203:
      return {
        data,
        message:
          `[${statusCode}] ${message}` ||
          `${statusCode} non authoritative information`,
        status,
      };
    case 204:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} no content`,
        status,
      };
    case 400:
      return {
        data,
        status: "error",
        message: `[${statusCode}] ${message}` || `${statusCode} bad request`,
      };
    case 401:
      return {
        data,
        status: "error",
        message: `[${statusCode}] ${message}` || `${statusCode} bad request`,
      };
    case 402:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} payment required`,
        status: "error",
      };
    case 403:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} forbidden`,
        status: "error",
      };
    case 404:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} not found`,
        status: "error",
      };
    case 405:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} method not allowd`,
        status: "error",
      };
    case 500:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} internal server error`,
        status: "error",
      };
    case 501:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} not implemented`,
        status: "error",
      };
    case 502:
      return {
        data,
        message: `[${statusCode}] ${message}` || `${statusCode} bad geteway`,
        status: "error",
      };
    case 503:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} service unavailable`,
        status: "error",
      };
    case 504:
      return {
        data,
        message:
          `[${statusCode}] ${message}` || `${statusCode} gateway timeout`,
        status: "error",
      };
    default:
      return {
        data,
        message:
          `[${statusCode}] ${message}` ||
          statusCode +
            "status code is not matching, please check the endpoint function status code returns and implement it to the messageResponse function in the `utils.tx`",
        status: "error",
      };
  }
}

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
  } else if (status === "error") {
    initialObject.isSuccess = false;
    initialObject.isError = true;
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
