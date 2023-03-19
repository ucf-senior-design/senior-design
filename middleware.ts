import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    "Access-Control-Allow-Origin",
    "https://we-tinerary-ucf-senior-design.vercel.app/",
  )
  requestHeaders.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  requestHeaders.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
  )
  requestHeaders.set("Access-Control-Allow-Credentials", "true")

  const response = NextResponse.next({
    // @ts-ignore
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
