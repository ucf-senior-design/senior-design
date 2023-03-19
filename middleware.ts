import { NextRequest, NextResponse } from "next/server"
import { firebaseAuth } from "./utility/firebase"
import { API_URL } from "./utility/constants"

export async function middleware(request: NextRequest) {
  let getUserResponse = await fetch(`${API_URL}auth/user`, { method: "GET" })

  // Add checks for all authenticated pages here
  if (!getUserResponse.ok) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }
  // Clone the request headers and set a new header `x-hello-from-middleware1`
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

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    // @ts-ignore
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
