import { AuthProvider } from "../utility/hooks/authentication"
import { ResizableProvider } from "../utility/hooks/resizable"
import { ScreenProvider } from "../utility/hooks/screen"
import { TripProvider } from "../utility/hooks/trip"
import React from "react"
import * as nextRouter from "next/router"
import * as queryString from "query-string"

export function wrapperForWidgets(): ({ children }: { children: React.ReactNode }) => JSX.Element {
  // @ts-ignore
  nextRouter.useRouter = jest.fn()
  // @ts-ignore
  nextRouter.useRouter.mockImplementation(() => ({ route: "/" }))

  return ({ children }: { children: React.ReactNode }) => (
    <ScreenProvider>
      <AuthProvider>
        <ResizableProvider>
          <TripProvider>{children} </TripProvider>{" "}
        </ResizableProvider>
      </AuthProvider>
    </ScreenProvider>
  )
}
