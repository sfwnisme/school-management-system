// import { deleteCookie, hasCookie } from "cookies-next";

import { FormDataObjectType, IApiResponseReturn } from "@/definitions";

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
  data?: T | null | undefined
): IApiResponseReturn<T> {
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
