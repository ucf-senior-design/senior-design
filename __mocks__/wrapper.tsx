import { AuthProvider } from "../utility/hooks/authentication"
import { ResizableProvider } from "../utility/hooks/resizable"
import { ScreenProvider } from "../utility/hooks/screen"
import { TripProvider } from "../utility/hooks/trip"
import React from "react"

export function wrapperForWidgets(): ({ children }: { children: React.ReactNode }) => JSX.Element {
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
