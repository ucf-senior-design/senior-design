import * as firebaseAdmin from "firebase-admin"

if (process.env.NODE_ENV === "test") {
  require("dotenv").config({
    path: ".../.env.local",
  })
}

const serviceAccount = {
  privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  })
}

export default firebaseAdmin
