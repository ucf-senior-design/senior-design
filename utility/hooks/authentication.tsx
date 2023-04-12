import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  sendEmailVerification as doSendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
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
  user?: User & { didFinishRegister: boolean; loggedIn: boolean }
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
  maybeLoadPersistedUser: () => void
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
  const [user, setUser] = React.useState<User & { didFinishRegister: boolean; loggedIn: boolean }>()
  const [firebaseUser, setFirebaseUser] = React.useState<{
    user: FirebaseUser | null
    loaded: boolean
  }>({
    user: null,
    loaded: false,
  })
  const { updateErrorToast } = useScreen()

  const [localUser, saveLocalUser, removeLocalUser] = useLocalStorage<
    undefined | (User & { didFinishRegister: boolean; loggedIn: boolean })
  >("user", undefined)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (u) {
      setFirebaseUser({
        user: u,
        loaded: true,
      })
    })
  }, [])

  React.useEffect(() => {
    console.log("maybe loading user...")
    maybeLoadPersistedUser()
  }, [firebaseUser])
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

  function maybeLoadPersistedUser() {
    if (firebaseUser.loaded)
      setUser({
        username: localUser?.username ?? "",
        medicalInfo: localUser?.medicalInfo ?? [],
        allergies: localUser?.allergies ?? [],
        didFinishRegister: localUser?.didFinishRegister ?? false,
        uid: firebaseUser.user?.uid ?? "",
        email: firebaseUser.user?.email ?? "",
        name: firebaseUser.user?.displayName ?? "",
        profilePic: firebaseUser.user?.photoURL ?? "",
        loggedIn: firebaseUser.user !== null,
      })
  }

  async function doSearch(search: string, onSuccess: (user: User) => void) {
    await fetch(`${API_URL}auth/user/find/${search}`, {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        let user = await response.json()
        onSuccess(user)
      } else {
        updateErrorToast(await response.text())
      }
    })
  }

  async function doLogout() {
    await firebaseAuth
      .signOut()
      .then(() => {
        removeLocalUser()
        setUser({
          username: "",
          medicalInfo: [],
          allergies: [],
          uid: "",
          email: "",
          name: "",
          profilePic: "",
          didFinishRegister: false,
          loggedIn: false,
        })
        Router.push("/")
      })
      .catch(() => {
        updateErrorToast("unable to logout at this time.")
      })
  }

  async function storePartialCredentialResult(u: any) {
    const user = {
      username: "",
      medicalInfo: [],
      allergies: [],
      uid: firebaseUser.user?.uid ?? "",
      email: firebaseUser.user?.email ?? "",
      name: firebaseUser.user?.displayName ?? "",
      profilePic: firebaseUser.user?.photoURL ?? "",
      didFinishRegister: false,
      loggedIn: firebaseUser.user !== null,
    }
    saveLocalUser(user)
    setUser(user)
  }
  function getCredential(provider: string, idToken: string, accessToken: string): OAuthCredential {
    if (provider === "google") {
      return GoogleAuthProvider.credential(idToken, accessToken)
    }
    return FacebookAuthProvider.credential(idToken)
  }
  async function handleCredentials(
    provider: "google" | "facebook",
    idToken: string,
    accessToken: string,
    callback: (result: undefined | UserCredential) => void,
  ) {
    let credential = getCredential(provider, idToken, accessToken)

    await signInWithCredential(firebaseAuth, credential)
      .then(async (result) => {
        callback(result)
      })
      .catch(() => callback(undefined))
  }
  async function doLoginWithCredentials(
    provider: "google" | "facebook",

    idToken: string,
    accessToken?: string,
  ) {
    handleCredentials(provider, idToken, accessToken ?? "", async (user) => {
      if (user === undefined) {
        updateErrorToast("Could not log in user.")
      } else {
        const options = createFetchRequestOptions(JSON.stringify(user), "POST")

        const response = await fetch(`${API_URL}auth/loginWithCred`, options)

        if (response.ok) {
          if (response.status === 200) {
            await saveRegisterdUser(await response.json())
            Router.push("/dashboard")
          }
          if (response.status === 202) {
            await storePartialCredentialResult(await response.json())
            Router.push("/auth/details")
          }
        } else {
          updateErrorToast(await response.text())
        }
      }
    })
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
      uid: firebaseUser.user?.uid ?? "",
      email: firebaseUser.user?.email ?? "",
      name: firebaseUser.user?.displayName ?? "",
      profilePic: firebaseUser.user?.photoURL ?? "",
      loggedIn: firebaseUser.user !== null,
      didFinishRegister: true,
    })
    setUser({
      ...user,
      uid: firebaseUser.user?.uid ?? "",
      email: firebaseUser.user?.email ?? "",
      name: firebaseUser.user?.displayName ?? "",
      profilePic: firebaseUser.user?.photoURL ?? "",
      loggedIn: firebaseUser.user !== null,
      didFinishRegister: true,
    })
  }

  async function addDetails(user: User, callback: (response: AuthenticationResponse) => void) {
    // TODO: add profile picture
    const options = createFetchRequestOptions(JSON.stringify(user), "POST")
    const response = await fetch(`${API_URL}auth/details`, options)
    const result = await response.text()

    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        saveRegisterdUser(user)

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
    await doThirdPartyLogin("google", new GoogleAuthProvider())
  }

  async function sendEmailVerification(callback: (response: AuthenticationResponse) => void) {
    if (firebaseAuth.currentUser === null) {
      updateErrorToast("User is not logged in")
      Router.push("/")
      return
    }
    if (firebaseAuth.currentUser.emailVerified) {
      Router.push("/dashboard")
    } else {
      await doSendEmailVerification(firebaseAuth.currentUser)
        .then(() => {
          callback({ isSuccess: true })
        })
        .catch(() => {
          callback({ isSuccess: false, errorMessage: "please try again later." })
        })
    }
  }

  function getMessage(error: AuthError) {
    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        return "Email exists."
        break
      case AuthErrorCodes.INVALID_EMAIL:
        return "Invalid email."
        break
      case AuthErrorCodes.WEAK_PASSWORD:
        return "Weak password."
        break
      case AuthErrorCodes.INVALID_PASSWORD:
        return "Invalid Password."
        break
      default:
        return "Try again later."
    }
  }
  async function doEmailPasswordRegister(
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void,
  ) {
    await createUserWithEmailAndPassword(firebaseAuth, register.email, register.password)
      .then(async (result) => {
        await storePartialCredentialResult(result)
        Router.push("/auth/details")
      })
      .catch((error: AuthError) => {
        updateErrorToast(error.name)
      })
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    await signInWithEmailAndPassword(firebaseAuth, login.email, login.password).then(async (u) => {
      const options = createFetchRequestOptions(JSON.stringify(u.user), "POST")
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
    })
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
