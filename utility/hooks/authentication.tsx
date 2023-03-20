import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from "firebase/auth"
import Router from "next/router"
import React from "react"
import { useLocalStorage } from "react-use-storage"
import { EMAIL_VERIFIED, MUST_ADD_DETAILS, MUST_VERIFY_EMAIL } from "../constants"
import { createFetchRequestOptions } from "../fetch"
import { firebaseAuth } from "../firebase"
import { User } from "../types/user"
import { useScreen } from "./screen"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

interface AuthContext {
  user?: User & { didFinishRegister: boolean }
  saveRegisterdUser: (user: User) => Promise<void>
  doFacebookLogin: () => Promise<void>
  doGoogleLogin: () => Promise<void>
  doEmailPasswordLogin: (
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) => Promise<void>
  doEmailPasswordRegister: (
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void,
  ) => Promise<void>
  doLogout: () => Promise<void>
  addDetails: (user: User, callback: (response: AuthenticationResponse) => void) => Promise<void>
  sendEmailVerification: (callback: (response: AuthenticationResponse) => void) => Promise<void>
  sendPasswordReset: (
    email: string,
    callback: (response: AuthenticationResponse) => void,
  ) => Promise<void>
  maybeLoadPersistedUser: () => Promise<void>
  doSearch: (search: string, onSuccess: (user: User) => void) => Promise<void>
}

// Use this to handle any authentication processes
const AuthContext = React.createContext<AuthContext>({} as AuthContext)

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User & { didFinishRegister: boolean }>()
  const { updateErrorToast } = useScreen()

  const [localUser, saveLocalUser, removeLocalUser] = useLocalStorage<
    undefined | (User & { didFinishRegister: boolean })
  >("user", undefined)

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  React.useEffect(() => {
    console.log("loading user....")
    maybeLoadPersistedUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        saveRegisterdUser,
        doFacebookLogin,
        doGoogleLogin,
        doEmailPasswordLogin,
        doEmailPasswordRegister,
        addDetails,
        doLogout,
        sendEmailVerification,
        sendPasswordReset,
        maybeLoadPersistedUser,
        doSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )

  async function maybeLoadPersistedUser() {
    await fetch(`${API_URL}auth/user`, { method: "GET" }).then(async (response) => {
      if (response.ok) {
        let currentUser: FirebaseUser = await response.json()
        setUser({
          username: localUser?.username ?? "",
          medicalInfo: localUser?.medicalInfo ?? [],
          allergies: localUser?.allergies ?? [],
          didFinishRegister: localUser?.didFinishRegister ?? false,
          uid: currentUser.uid,
          email: currentUser.email ?? "",
          name: localUser?.name ?? "",
          profilePic: currentUser.photoURL ?? "",
        })
      } else {
        removeLocalUser()
        setUser({
          username: localUser?.username ?? "",
          medicalInfo: localUser?.medicalInfo ?? [],
          allergies: localUser?.allergies ?? [],
          didFinishRegister: localUser?.didFinishRegister ?? false,
          uid: "",
          email: "",
          name: "",
          profilePic: "",
        })
      }
    })
  }

  async function doSearch(search: string, onSuccess: (user: User) => void) {
    await fetch(`${API_URL}auth/user/find/${search}`, {
      method: "GET",
    }).then(async (response) => {
      console.log(response.status)
      if (response.ok) {
        let user = await response.json()
        onSuccess(user)
      } else {
        updateErrorToast(await response.text())
      }
    })
  }

  async function doLogout() {
    removeLocalUser()
    setUser(undefined)
    Router.push("/")
  }

  async function storePartialCredentialResult(u: any) {
    const user = {
      username: "",
      medicalInfo: [],
      allergies: [],
      uid: u.uid ?? "",
      email: u.email ?? "",
      name: u.name ?? "",
      profilePic: u.photo ?? "",
      didFinishRegister: false,
    }
    saveLocalUser(user)
    setUser(user)
  }

  async function doLoginWithCredentials(
    provider: "google" | "facebook" | "twitter",

    idToken: string,
    accessToken?: string,
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({
        provider: provider,
        idToken: idToken,
        accessToken: accessToken,
      }),
      "POST",
    )

    const response = await fetch(`${API_URL}auth/loginWithCred`, options)

    if (response.ok) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json())
        Router.push("/dashboard")
      }
      if (response.status === 202) {
        await storePartialCredentialResult(await response.json())
        Router.push("auth/details")
      }
    } else {
      updateErrorToast(await response.text())
    }
  }

  function doThirdPartyLogin(
    providerType: "facebook" | "google",
    provider: GoogleAuthProvider | FacebookAuthProvider,
  ) {
    signInWithPopup(firebaseAuth, provider).then(async (result) => {
      const credential =
        providerType === "facebook"
          ? FacebookAuthProvider.credentialFromResult(result)
          : GoogleAuthProvider.credentialFromResult(result)

      if (credential !== null && credential?.accessToken !== null) {
        if (providerType === "google") {
          await doLoginWithCredentials(
            "google",
            credential.idToken ?? "",
            credential.accessToken ?? "",
          )
        } else {
          await doLoginWithCredentials("facebook", credential.accessToken ?? "")
        }
      }
    })
  }
  async function doFacebookLogin() {
    doThirdPartyLogin("facebook", new FacebookAuthProvider())
  }

  async function saveRegisterdUser(user: User) {
    saveLocalUser({
      ...user,
      didFinishRegister: true,
    })
    setUser({ ...user, didFinishRegister: true })
  }

  async function addDetails(user: User, callback: (response: AuthenticationResponse) => void) {
    const options = createFetchRequestOptions(JSON.stringify(user), "POST")
    const response = await fetch(`${API_URL}auth/details`, options)
    const result = await response.text()

    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        saveRegisterdUser(user)
        // TODO: redirect to dashboard
        Router.push("/dashboard/")
        return
      } else {
        Router.push("/auth/registerEmail")
      }
      callback({ isSuccess: response.ok })
      return
    }
    callback({ isSuccess: response.ok, errorMessage: result })
  }

  async function doGoogleLogin() {
    doThirdPartyLogin("google", new GoogleAuthProvider())
  }

  async function sendEmailVerification(callback: (response: AuthenticationResponse) => void) {
    const options = createFetchRequestOptions(JSON.stringify({}), "POST")

    const response = await fetch(`${API_URL}auth/verifyEmail`, options)
    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        Router.push("/dashboard")
      }
      callback({ isSuccess: response.ok })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  async function doEmailPasswordRegister(
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(JSON.stringify(register), "POST")
    const response = await fetch(`${API_URL}auth/register`, options)

    if (response.ok) {
      await storePartialCredentialResult(await response.json())
      Router.push("/auth/details")
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({ ...login, purpose: "email" }),
      "POST",
    )
    const response = await fetch(`${API_URL}auth/login`, options)

    if (response.ok) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json())
        Router.push("/dashboard")
      } else if (response.status === MUST_VERIFY_EMAIL) {
        // Go to Email Verficications Pge
        await saveRegisterdUser(await response.json())
        Router.push("/auth/registerEmail")
      } else if (response.status === MUST_ADD_DETAILS) {
        await storePartialCredentialResult(await response.json())
        //Go to Details Page
        Router.push("/auth/details")
      }
      return
    }
    const result = await response.text()
    callback({ isSuccess: response.ok, errorMessage: result })
  }

  async function sendPasswordReset(
    email: string,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(JSON.stringify({ email: email }), "POST")
    const response = await fetch(`${API_URL}auth/passwordReset`, options)

    if (response.ok) {
      callback({ isSuccess: response.ok })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }
}
