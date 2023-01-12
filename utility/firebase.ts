import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig =
  process.env.REACT_APP_FIREBASE_API_KEY !== undefined
    ? // React.js requires REACT_APP prefix for env variables
      // See: https://create-react-app.dev/docs/adding-custom-environment-variables/
      {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
      }
    : // Next.js requires NEXT_PUBLIC prefix for env variables
      // See :https://nextjs.org/docs/basic-features/environment-variables

      {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
      };

const app =
  firebase.apps.length === 0
    ? firebase.initializeApp(firebaseConfig)
    : firebase.apps[0];
export const firebaseAuth = app.auth();
export const firebaseStorage = getStorage(app);
