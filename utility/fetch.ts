import axios, { AxiosResponse } from "axios"
import auth from "firebase/auth"

/**
 * Handles fetch requests that make requests to a firebase authentication endpoint.
 * @param {string} method https request method type
 * @param {string} url url where the request needs to be made
 * @param {any} [data] values that go into the body of the request
 * @param type type of request. Defining this allows a potential error to be handled correctly.
 * @returns corresponding result, errorMessage, and errorCode
 */
export async function handleFetch<T>(
  method: "POST" | "GET" | "DELETE" | "PUT",
  url: string,
  type: "Firebase/Auth",
  data: any = {},
): Promise<{ result: T; errorMessage: string; errorCode: number }> {
  var result = {} as any as T
  var errorMessage = ""
  var errorCode = 0
  try {
    switch (method) {
      case "POST": {
        const response: AxiosResponse = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        result = response.data as any as T
        break
      }
      case "GET": {
        const response: AxiosResponse = await axios.get(url)
        result = response.data as any as T
        break
      }
      case "DELETE": {
        const response: AxiosResponse = await axios.delete(url)
        result = response.data as any as T
        break
      }
      case "PUT": {
        const response: AxiosResponse = await axios.put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        result = response.data as any as T
        break
      }
    }
  } catch (err: any) {
    switch (err) {
      case axios.isAxiosError(err): {
        errorMessage = "Try again Later. "
        errorCode = 400
        break
      }
      case type === "Firebase/Auth": {
        let error = err as any as auth.AuthError
        errorMessage = error.message
        errorCode = 400
      }
    }
  }
  return { result, errorMessage, errorCode }
}

export function createFetchRequestOptions(
  body: string | null,
  method: "POST" | "GET" | "DELETE" | "PUT",
) {
  const myHeaders = new Headers()
  if (body !== null) {
    myHeaders.append("Content-Type", "application/json")
  }

  const requestOptions: RequestInit =
    method !== "GET"
      ? {
          method,
          headers: myHeaders,
          redirect: "follow",
          body: body,
        }
      : {
          method,
        }

  return requestOptions
}
