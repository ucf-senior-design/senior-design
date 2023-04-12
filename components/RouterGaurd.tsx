import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../utility/hooks/authentication"
import { useScreen } from "../utility/hooks/screen"

export { RouteGuard }

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user } = useAuth()
  const { authStatus, setAuthStatus, updateErrorToast } = useScreen()

  useEffect(() => {
    if (user !== undefined) {
      authCheck(router.asPath)
    } else if (
      user === undefined &&
      (router.asPath === "/" || router.asPath === "/about" || router.asPath.startsWith("/auth"))
    ) {
      setAuthStatus({
        authorized: true,
        loggedIn: false,
      })
    }

    // on route change start - hide page content by setting authorized to false
    const hideContent = () =>
      setAuthStatus({
        loggedIn: false,
        authorized: false,
      })
    router.events.on("routeChangeStart", hideContent)

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent)
      router.events.off("routeChangeComplete", authCheck)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function authCheck(url: string) {
    const publicPaths = [
      "/auth/login",
      "/",
      "/auth/register",
      "/auth/details",
      "/about",
      "/auth/registerEmail",
    ]

    const path = url.split("?")[0]

    if (user !== undefined && !user.loggedIn && !publicPaths.includes(path)) {
      setAuthStatus({
        loggedIn: user !== undefined && user.loggedIn,
        authorized: false,
      })
      updateErrorToast("Please log in before accessing the application!")
      router.push({
        pathname: "/auth/login",
      })
      return
    } else if (
      user !== undefined &&
      user.loggedIn &&
      user.didFinishRegister === false &&
      !publicPaths.includes(path)
    ) {
      updateErrorToast("Please finish registering before accessing the application!")
      router.push({
        pathname: "/auth/details",
      })
    } else if (["/auth/details"].includes(path)) {
      if (user?.uid.length !== 0 && user?.didFinishRegister) {
        router.push({
          pathname: "/dashboard",
        })
      } else if (user !== undefined && !user?.loggedIn) {
        updateErrorToast("Please log in before accessing the application!")
        router.push({
          pathname: "/auth/login",
        })
      }
      setAuthStatus({
        loggedIn: user !== undefined && user.loggedIn,
        authorized: true,
      })
    } else {
      setAuthStatus({
        loggedIn: user !== undefined && user.loggedIn,
        authorized: true,
      })
    }
  }

  return <>{authStatus.authorized && children}</>
}
