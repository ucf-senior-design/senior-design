import auth, { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { ERROR, MUST_ADD_DETAILS, MUST_VERIFY_EMAIL, SUCCESS } from "../../../utility/constants"
import { firebaseAuth } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { User } from "../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await signInWithEmailAndPassword(firebaseAuth, req.body.email, req.body.password)
    .then(async (result) => {
      // Looks to see if user has filled out their details yet by seeing if there is a doc in the "Users" collection with the user's uid.
      try {
        const maybeUser = await (
          await firebaseAdmin
            .firestore()
            .collection("Users")
            .where("uid", "==", result.user.uid)
            .get()
        ).docs[0]

        if (maybeUser === undefined) {
          res.status(MUST_ADD_DETAILS).send({
            uid: result.user.uid,
            email: result.user.email,
            photo: result.user.photoURL,
          })
          return
        }

        if ((await firebaseAdmin.auth().getUser(result.user.uid)).emailVerified === false) {
          res.status(MUST_VERIFY_EMAIL).send(maybeUser.data() as any as User)
        }

        res.status(SUCCESS).send(maybeUser.data() as any as User)
      } catch (error) {
        let authError = error as auth.AuthError
        res.status(ERROR).send(authError.message)
      }
    })
    .catch((error: auth.AuthError) => {
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          res.status(ERROR).send("Invalid email.")
          break
        case AuthErrorCodes.INVALID_PASSWORD:
          res.status(ERROR).send("Invalid Password.")
          break
        case "auth/user-not-found":
          res.status(ERROR).send("User not found.")
          break
        default:
          res.status(ERROR).send("Try again later.")
          return
      }
    })
}
