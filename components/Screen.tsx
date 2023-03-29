import { useRouter } from "next/router"
import * as React from "react"
import { toast, ToastContainer, ToastOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import theme from "../styles/theme/Theme"
import { useScreen } from "../utility/hooks/screen"
import NavBar from "./NavBar/NavBar"

export default function Screen({ children, path }: { path: string; children: React.ReactNode }) {
  const {
    errorToast,
    updateErrorToast,
    autoPadding,
    updateLoading,
    successToast,
    updateSuccessToast,
    nav,
    loading,
    updateNav,
  } = useScreen()
  const router = useRouter()
  const backgroundImage = path === "/about" ? "url('/Mountains.svg') 80% 80% " : undefined
  const msgToastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }

  // Resets View Trip Header UI on non view trip pages
  React.useEffect(() => {
    if (!router.pathname.startsWith("/dashboard/trip/[[...params]]"))
      updateNav(undefined, undefined, <></>)
  }, [router])
  // Resets error toast after being shown.
  React.useEffect(() => {
    if (errorToast !== undefined) {
      toast.error(errorToast, msgToastOptions)
      updateErrorToast(undefined)
    }
  }, [errorToast])

  // Resets success toast after being shown.
  React.useEffect(() => {
    if (successToast !== undefined) {
      toast.success(successToast, msgToastOptions)
      updateSuccessToast(undefined)
    }
  }, [successToast])

  // Resets loading when user switches pages after loading
  React.useEffect(() => {
    updateLoading(false)
  }, [path])

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={nav.style}>
        <NavBar path={path} />
        {nav.children}
      </div>

      <div
        style={{
          height: "100vh",
          width: "100vw",
          padding: autoPadding ? 10 : 0,
          backgroundColor: theme.palette.background.default,
          background: backgroundImage,
        }}
      >
        <ToastContainer />
        {children}
      </div>
    </div>
  )
}
