import React from "react"
import { renderHook, act } from "@testing-library/react-hooks/dom"
import { AuthProvider, useAuth } from "../utility/hooks/authentication"
import { mockAllFetch } from "../__mocks__/fetch"

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
    jest.spyOn(console, "log").mockImplementation(() => {})
    mockAllFetch(true, 200)
  })

  test("User is undefined on mount", () => {
    act(() => {
      // @ts-ignore
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider> {children}</AuthProvider>
      )
      const { result } = renderHook(() => useAuth(), { wrapper })
      expect(result.current.user).toEqual(undefined)
    })
  })
})
