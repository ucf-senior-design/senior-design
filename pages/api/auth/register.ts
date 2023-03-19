import auth, { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth"
import type { NextApiResponse } from "next"
import { firebaseAuth } from "../../../utility/firebase"
import { RegistrationRequest } from "../../../utility/types/user"

export default async function handler(req: RegistrationRequest, res: NextApiResponse) {
  await createUserWithEmailAndPassword(firebaseAuth, req.body.email, req.body.password)
    .then((result) => {
      res.status(200).send({
        uid: result.user.uid,
        email: result.user.email,
        photo: result.user.photoURL,
      })
    })
    .catch((error: auth.AuthError) => {
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          res.status(400).send("Email exists.")
          break
        case AuthErrorCodes.INVALID_EMAIL:
          res.status(400).send("Invalid email.")
          break
        case AuthErrorCodes.WEAK_PASSWORD:
          res.status(400).send("Weak password.")
          break
        case AuthErrorCodes.INVALID_PASSWORD:
          res.status(400).send("Invalid Password.")
          break
        default:
          res.status(400).send("Try again later.")
      }
    })
}
