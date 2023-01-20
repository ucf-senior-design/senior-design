import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';
import { useLocalStorage } from 'react-use-storage';
import { createFetchRequestOptions } from '../fetch';
import { firebaseAuth } from '../firebase';
import { User } from '../types/user';

interface EmailPasswordLogin {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  isSuccess: boolean;
  errorMessage?: string;
}

interface AuthContext {
  user?: User & { didFinishRegister: boolean };
  saveRegisterdUser: (user: User) => Promise<void>;
  doFacebookLogin: () => Promise<void>;
  doGoogleLogin: () => Promise<void>;
  doEmailPasswordLogin: (
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void
  ) => Promise<void>;
  doEmailPasswordRegister: (
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void
  ) => Promise<void>;
  doLogout: () => Promise<void>;
  addDetails: (
    user: User,
    callback: (response: AuthenticationResponse) => void
  ) => Promise<void>;
  sendEmailVerification: (
    callback: (response: AuthenticationResponse) => void
  ) => Promise<void>;
  sendPasswordReset: (
    callback: (response: AuthenticationResponse) => void
  ) => Promise<void>;
}

const MUST_VERIFY_EMAIL = 203;
const MUST_ADD_DETAILS = 202;
const EMAIL_VERIFIED = 201;

// Use this to handle any authentication processes
const AuthContext = React.createContext<AuthContext>({} as AuthContext);

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<
    User & { didFinishRegister: boolean }
  >();

  const [localUser, saveLocalUser, removeLocalUser] = useLocalStorage<
    undefined | (User & { didFinishRegister: boolean })
  >('user', undefined);

  const API_URL = process.env.REACT_APP_API_URL;
  React.useEffect(() => {
    maybeLoadPersistedUser();
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  async function maybeLoadPersistedUser() {
    const user = localUser;

    if (user !== undefined && user !== null) {
      setUser(user);
    }
  }

  async function doLogout() {
    removeLocalUser();
    setUser(undefined);
  }

  async function storePartialCredentialResult(u: any) {
    const user = {
      username: '',
      medicalInfo: [],
      allergies: [],
      uid: u.uid ?? '',
      email: u.email ?? '',
      name: u.name ?? '',
      profilePic: u.photo ?? '',
      didFinishRegister: false,
    };
    saveLocalUser(user);
    setUser(user);
  }

  async function doLoginWithCredentials(
    provider: 'google' | 'facebook' | 'twitter',
    idToken: string
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({
        provider: provider,
        idToken: idToken,
      }),
      'POST'
    );

    const response = await fetch(`${API_URL}auth/loginWithCred`, options);

    if ((response.ok, response.status)) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json());
      }
      if (response.status === 202) {
        await storePartialCredentialResult(await response.json());
      }
    } else {
      alert(await response.text());
    }
  }

  function doThirdPartyLogin(
    providerType: 'facebook' | 'google',
    provider: GoogleAuthProvider | FacebookAuthProvider,
    callback: (isSuccess: boolean) => void
  ) {
    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        const user = result.user;
        const credential =
          providerType === 'facebook'
            ? FacebookAuthProvider.credentialFromResult(result)
            : GoogleAuthProvider.credentialFromResult(result);

        if (credential !== null && credential?.accessToken !== null) {
          if (providerType === 'google') {
            await doLoginWithCredentials('google', credential.accessToken ?? '')
              .then(() => callback(true))
              .catch(() => callback(false));
          } else {
            await doLoginWithCredentials(
              'facebook',
              credential.accessToken ?? ''
            )
              .then(() => callback(true))
              .catch(() => callback(false));
          }
        }
      })
      .catch((error) => {
        // TODO: Do something to handle Errors
        callback(false);
      });
  }
  async function doFacebookLogin() {
    doThirdPartyLogin('facebook', new FacebookAuthProvider(), (isSuccess) => {
      // TODO: Handle Success and Errors
      alert('Facebook Login Succesful?: ' + isSuccess);
    });
  }

  async function saveRegisterdUser(user: User) {
    saveLocalUser({
      ...user,
      didFinishRegister: true,
    });
    setUser({ ...user, didFinishRegister: true });
  }

  async function addDetails(
    user: User,
    callback: (response: AuthenticationResponse) => void
  ) {
    const options = createFetchRequestOptions(JSON.stringify(user), 'POST');
    const response = await fetch(`${API_URL}auth/details`, options);
    const result = await response.text();

    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        saveRegisterdUser(user);
        return;
      }
      callback({ isSuccess: response.ok });
      return;
    }
    callback({ isSuccess: response.ok, errorMessage: result });
  }

  async function doGoogleLogin() {
    doThirdPartyLogin('google', new GoogleAuthProvider(), (isSuccess) => {
      alert('Facebook Login Succesful?: ' + isSuccess);
    });
  }

  async function sendEmailVerification(
    callback: (response: AuthenticationResponse) => void
  ) {
    const user = localUser;

    const options = createFetchRequestOptions(
      JSON.stringify({
        email: user ? user.email : '',
        uid: user ? user.uid : '',
      }),
      'POST'
    );

    const response = await fetch(`${API_URL}auth/email`, options);
    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        // TODO: Handle accounts That have a verified email already
        console.log('Email Already Verrified');
      }
      callback({ isSuccess: response.ok });
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  }

  async function doEmailPasswordRegister(
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void
  ) {
    const options = createFetchRequestOptions(JSON.stringify(register), 'POST');
    const response = await fetch(`${API_URL}auth/register`, options);

    if (response.ok) {
      await storePartialCredentialResult(await response.json());
      // TODO: Create Details Page
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({ ...login, purpose: 'email' }),
      'POST'
    );
    const response = await fetch(`${API_URL}auth/login`, options);

    if (response.ok) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json());
      } else if (response.status === MUST_VERIFY_EMAIL) {
        // Go to Email Verficications Pge
      } else if (response.status === MUST_ADD_DETAILS) {
        await storePartialCredentialResult(await response.json());
        // Go to Details Page
      }
      return;
    }
    const result = await response.text();
    callback({ isSuccess: response.ok, errorMessage: result });
  }

  async function sendPasswordReset(
    callback: (response: AuthenticationResponse) => void
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({ purpose: 'password' }),
      'POST'
    );
    const response = await fetch(`${API_URL}auth/email`, options);

    if (response.ok) {
      callback({ isSuccess: response.ok });
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  }
}
