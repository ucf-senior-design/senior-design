import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useContext, useEffect, useState } from "react";

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
}

const AuthContext = React.createContext<ContextInterface>({} as ContextInterface)
const auth = firebase.auth();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  const value = {
    user,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}