import React from "react"
import { renderHook, act } from "@testing-library/react-hooks"
import { render, screen } from "@testing-library/react"
import { AuthProvider, useAuth } from "../utility/hooks/authentication"

test("renders learn react link", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider> {children}</AuthProvider>
  )
  const { result } = renderHook(() => useAuth(), { wrapper })
})
