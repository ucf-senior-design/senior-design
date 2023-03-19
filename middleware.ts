import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    "Access-Control-Allow-Origin",
    "https://we-tinerary-middle-ucf-senior-design.vercel.app/",
  )
  requestHeaders.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  requestHeaders.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
  )
  requestHeaders.set("Access-Control-Allow-Credentials", "true")

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    // @ts-ignore
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
