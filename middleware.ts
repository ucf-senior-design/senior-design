import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // let getUserResponse = await fetch(`${API_URL}auth/user`, { method: "GET" })

  // if (!getUserResponse.ok) {
  //   if (
  //     request.nextUrl.pathname.startsWith("/dashboard") ||
  //     request.nextUrl.pathname.startsWith("/settings")
  //   ) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url))
  //   }
  // }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("Access-Control-Allow-Origin", request.nextUrl.origin)
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
