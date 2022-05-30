import axios from "axios";

import { useAuthToken } from "@/utils/hooks";

import { message } from "antd";

const apiEndpoint = window.apiEndpoint;

const requestError = {
  400: "Invalid request.",
  401: "Verification failed. Please refresh and try again.",
  429: "Too many requests. Please try again later.",
  500: "Server error. Please try again later.",
  502: "Couldn't connect to the server. Please try again later.",
  503: "Couldn't connect to the server. Please try again later.",
  504: "Timeout connecting to the server. Please try again later.",
  unknown: "Request error: ",
};

function makeErrorText(errorId: string, errorMessage?: string): string {
  const errorTypeMessage = requestError[errorId];
  let errorText = `${errorTypeMessage}`;
  if (errorTypeMessage) {
    errorText += errorMessage;
  }
  console.log(errorText);
  return errorText;
}

export interface ApiResponse<T> {
  requestError?: string;
  response?: T;
}

async function request<T>(
  path: string,
  method: "get" | "post",
  params?: any,
  body?: any,
  recaptchaToken?: string,
): Promise<ApiResponse<T>> {
  const { getToken } = useAuthToken();
  const token = getToken();

  let response: any;
  try {
    // STANDING OFF umijs request plugins
    // response = await (async () => {
    //   return new Promise((resolve, reject) => {
    //     // console.log(apiEndpoint + "api/" + path);
    //       _request(path, {
    //         method: method,
    //         params: params,
    //         data: body && JSON.stringify(body),
    //         headers: {
    //           ...(recaptchaToken ? { "X-Recaptcha-Token": recaptchaToken } : {}),
    //         }
    //       })
    //       .then((response: any) => {
    //         resolve(response);
    //       })
    //       .catch((error: any) => {
    //         reject(error);
    //       })
    //   })
    // })();

    response = await axios(apiEndpoint + path, {
      method: method,
      params: params,
      data: body && JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: token != "" && `Bearer ${token}`,
        ...(recaptchaToken ? { "X-Recaptcha-Token": recaptchaToken } : {}),
      },
      validateStatus: () => true,
    });
  } catch (e: any) {
    console.error(e);
    return {
      requestError: makeErrorText("unknown", e?.message),
    };
  }

  if (![200, 201].includes(response.status)) {
    try {
      console.log("response.data:", response.data);
    } catch (e) {
      console.log("response:", response);
    }

    if (response.status >= 500) {
      const errorMessage = "Network Error!";
      console.log(errorMessage);
      message.error(errorMessage);
    } else if (response.status >= 400) {
      const errorMessage = "Restricted Access!";
      message.warning(errorMessage);
      console.log(errorMessage);
    }

    if ([400, 401, 429, 500, 502, 503, 504].includes(response.status))
      return {
        requestError: makeErrorText(response.status),
      };

    return {
      requestError: makeErrorText(
        "unknown",
        `${response.status} ${response.statusText}`,
      ),
    };
  }

  return {
    response:
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data,
  };
}

import * as api from "./api-generated";
export default api;

export function createPostApi<BodyType, ResponseType>(
  path: string,
  recaptcha: true,
): (
  requestBody: BodyType,
  recaptchaTokenPromise: Promise<string>,
) => Promise<ApiResponse<ResponseType>>;
export function createPostApi<BodyType, ResponseType>(
  path: string,
  recaptcha: false,
): (requestBody: BodyType) => Promise<ApiResponse<ResponseType>>;

export function createPostApi<BodyType, ResponseType>(
  path: string,
  recaptcha: boolean,
) {
  return async (
    requestBody: BodyType,
    recaptchaTokenPromise?: Promise<string>,
  ): Promise<ApiResponse<ResponseType>> => {
    let recaptchaToken: string;
    try {
      recaptchaToken = (await recaptchaTokenPromise) as string;
    } catch (e) {
      return {
        requestError: makeErrorText("401"),
      };
    }

    return await request<ResponseType>(
      path,
      "post",
      null,
      requestBody,
      recaptchaToken,
    );
  };
}

export function createGetApi<QueryType, ResponseType>(path: string) {
  return async (
    requestQuery: QueryType,
  ): Promise<ApiResponse<ResponseType>> => {
    return await request<ResponseType>(path, "get", requestQuery, null);
  };
}
