import { sendPasswordResetEmail } from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../utility/firebase"

/**
 * /auth/passwordReset
 * Sends link to user's email for them to reset their password
 *
 * body : {email : string}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string | boolean>) {
  if (req.body.email === undefined) {
    res.status(400).send("Password cannot be reset.")
    return
  }

  await sendPasswordResetEmail(firebaseAuth, req.body.email)
    .then(() => {
      res.status(200).send("Success.")
    })
    .catch((error) => {
      res.status(400).send("Try again Later.")
    })
}
