import React from "react"

type UpdateNav = {
  style: React.CSSProperties | undefined
  children: React.ReactNode
  backgroundColor: undefined | string
}
interface ScreenContext {
  loading: boolean
  errorToast: string | undefined
  autoPadding: boolean
  successToast: string | undefined
  nav: UpdateNav
  authStatus: {
    loggedIn: boolean
    authorized: boolean
  }

  setAuthStatus: React.Dispatch<
    React.SetStateAction<{
      loggedIn: boolean
      authorized: boolean
    }>
  >
  updateLoading: (status: boolean) => void
  updateErrorToast: (status: string | undefined) => void
  updateAutoPadding: (status: boolean) => void
  updateSuccessToast: (status: string | undefined) => void
  updateNav: (
    style: undefined | React.CSSProperties,
    backgroundColor: undefined | string,
    children: React.ReactNode,
  ) => void
}
const ScreenContext = React.createContext<ScreenContext>({} as ScreenContext)

export function useScreen(): ScreenContext {
  const context = React.useContext(ScreenContext)

  if (!context) {
    throw Error("useScreen must be used within ScreenProvider")
  }
  return context
}

export function ScreenProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [authStatus, setAuthStatus] = React.useState({
    loggedIn: false,
    authorized: false,
  })

  const [errorToast, setErrorToast] = React.useState<string | undefined>()
  const [autoPadding, setAutoPadding] = React.useState(true)
  const [successToast, setSuccessToast] = React.useState<string | undefined>()
  const [nav, setNav] = React.useState<{
    style: React.CSSProperties | undefined
    children: React.ReactNode
    backgroundColor: undefined | string
  }>({
    style: undefined,
    children: <></>,
    backgroundColor: undefined,
  })

  function updateNav(
    style: undefined | React.CSSProperties,
    backgroundColor: undefined | string,
    children: React.ReactNode,
  ) {
    setNav({
      children: children,
      style: style,
      backgroundColor: backgroundColor,
    })
  }
  function updateLoading(status: boolean) {
    setLoading(status)
  }

  function updateErrorToast(status: string | undefined) {
    setErrorToast(status)
  }

  function updateAutoPadding(status: boolean) {
    setAutoPadding(status)
  }

  function updateSuccessToast(status: string | undefined) {
    setSuccessToast(status)
  }

  return (
    <ScreenContext.Provider
      value={{
        loading,
        nav,
        updateNav,
        updateLoading,
        updateErrorToast,
        errorToast,
        updateAutoPadding,
        autoPadding,
        successToast,
        updateSuccessToast,
        authStatus,
        setAuthStatus,
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
function setNavStyle(arg0: { style: React.CSSProperties | undefined }) {
  throw new Error("Function not implemented.")
}
