import axios, { AxiosResponse } from 'axios';
import auth from 'firebase/auth';

export async function doFetch<T>(
  url: string,
  data: any = {}
): Promise<{ result: T; errorMessage: string; errorCode: number }> {
  var result = {} as any as T;
  var errorMessage = '';
  var errorCode = 0;
  try {
    const response: AxiosResponse = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    result = response.data as any as T;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorMessage = err.message;
      errorCode = err.status ?? 400;
    } else {
      let error = err as any as auth.AuthError;
      errorMessage = error.message;
      errorCode = 400;
    }
  }
  return { result, errorMessage, errorCode };
}
