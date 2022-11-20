import * as firebaseAdmin from 'firebase-admin';
import { serviceAccount } from '../serviceAccount';
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export default firebaseAdmin;
