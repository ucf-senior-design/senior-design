import auth, {
  AuthErrorCodes,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithCredential,
  TwitterAuthProvider,
} from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { MUST_ADD_DETAILS } from "../../../utility/constants"
import { firebaseAuth } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { User } from "../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  function getCredential(): OAuthCredential | undefined {
    if (req.body.provider === "google") {
      return GoogleAuthProvider.credential(req.body.idToken, req.body.accessToken)
    } else if (req.body.provider === "twitter") {
      return TwitterAuthProvider.credential(
        req.body.idToken,
        process.env.REACT_APP_TWITTER_SECRET ?? "",
      )
    } else if (req.body.provider === "facebook") {
      return FacebookAuthProvider.credential(req.body.idToken)
    }
    return undefined
  }

  let credential = getCredential()
  if (credential === undefined) {
    res.status(400).send("Invalid Provider.")
    return
  }

  await signInWithCredential(firebaseAuth, credential)
    .then(async (result) => {
      const maybeUser = (
        await firebaseAdmin
          .firestore()
          .collection("Users")
          .where("uid", "==", result.user.uid)
          .get()
      ).docs[0]

      // Looks to see if user has filled out their details yet by seeing if there is a doc in the "Users" collection with the user's uid.
      if (maybeUser === undefined) {
        res.status(MUST_ADD_DETAILS).send({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
        })
        return
      }

      const user = maybeUser.data() as any as User
      res.status(200).send(user)
    })
    .catch((error: auth.AuthError) => {
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          res.status(400).send("Invalid email.")
          break
        case AuthErrorCodes.INVALID_PASSWORD:
          res.status(400).send("Invalid Password.")
          break
        default:
          res.status(400).send("Try again later.")
      }
    })
}
