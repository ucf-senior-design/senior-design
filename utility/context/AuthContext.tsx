import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "../firebase";

interface User {
    uid: string
    email: string
    name: string
    profilePic: string
    userName: string
    medicalInfo: Array<string>
    allergies: Array<string>
  }

interface EmailPasswordLogin {
    email: string
    password: string
  }
  
interface AuthenticationResponse {
    isSuccess: boolean
    errorMessage?: string
}

interface ContextInterface {
    user?: firebase.User | null
    firebaseLogin: (email: string, password: string) => Promise<any>
    signup: any
    logout: any
}

const AuthContext = React.createContext<ContextInterface>({user: null} as ContextInterface)

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  function firebaseLogin(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      firebaseLogin,
      signup,
      logout,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}