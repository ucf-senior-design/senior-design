import { ServiceAccount } from 'firebase-admin';

export const serviceAccount: ServiceAccount = {
  privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};
