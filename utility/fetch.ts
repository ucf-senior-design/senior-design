import { NextApiResponse } from 'next';
import fetch, { RequestInfo, RequestInit } from 'node-fetch';

type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export function createFetchOptions(method: HTTPMethod, body: string = '') {
  if (body.length > 0) {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    };
  }
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export async function doFetch<T>(
  url: RequestInfo,
  res: NextApiResponse,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);
  const results = (await response.json()) as any as T;
  if (!response.ok) {
    if (!res.headersSent) res.status(response.status).send(results);
  }

  return results;
}
