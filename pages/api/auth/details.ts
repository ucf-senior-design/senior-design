import auth from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { EMAIL_VERIFIED, ERROR, SUCCESS } from "../../../utility/constants"
import { firebaseAuth } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { User } from "../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | string>) {
  let user: User = {
    uid: req.body.uid,
    email: req.body.email,
    profilePic: "",
    name: req.body.name,
    username: req.body.username,
    medicalInfo: req.body.medicalInfo,
    allergies: req.body.allergies,
  }

  try {
    // Checks to make sure that the username is not currently taken by another user. If it is, the query will return one doc.
    const usersWithUsername = await firebaseAdmin
      .firestore()
      .collection("Users")
      .where("username", "==", req.body.username)
      .get()

    if (usersWithUsername.docs.length > 0) {
      res.status(ERROR).send("Username taken.")
      return
    }

    // Stores the users details in the "Users" collection. The document will be set by the useres uid.
    await firebaseAdmin.firestore().collection("Users").doc(user.uid).set(user)

    await firebaseAdmin
      .auth()
      .getUserByEmail(req.body.email)
      .then((u) => {
        if (u.emailVerified) {
          res.status(EMAIL_VERIFIED).send(user)
          return
        }
      })

    res.status(SUCCESS).send(user)
  } catch (error) {
    let authError = error as auth.AuthError
    res.status(ERROR).send(authError.message)
  }
}
