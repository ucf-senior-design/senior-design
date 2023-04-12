import auth, { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { ERROR, MUST_ADD_DETAILS, MUST_VERIFY_EMAIL, SUCCESS } from "../../../utility/constants"
import { firebaseAuth } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { User } from "../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let user = req.body
  // Looks to see if user has filled out their details yet by seeing if there is a doc in the "Users" collection with the user's uid.
  try {
    const maybeUser = await (
      await firebaseAdmin.firestore().collection("Users").where("uid", "==", user.uid).get()
    ).docs[0]

    if (maybeUser === undefined) {
      res.status(MUST_ADD_DETAILS).send({
        uid: user.uid,
        email: user.email,
        photo: user.photoURL,
      })
      return
    }

    if ((await firebaseAdmin.auth().getUser(user.uid)).emailVerified === false) {
      res.status(MUST_VERIFY_EMAIL).send(maybeUser.data() as any as User)
    }

    res.status(SUCCESS).send(maybeUser.data() as any as User)
  } catch (error) {
    let authError = error as auth.AuthError
    res.status(ERROR).send(authError.message)
  }
}
