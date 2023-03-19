import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { EMAIL_VERIFIED } from "../../../utility/constants"
import { firebaseAuth } from "../../../utility/firebase"

/**
 * /auth/verifyEmail
 * Sends link to user's email to verify the email is in use.
 *
 * body : none
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string | boolean>) {
  const user = firebaseAuth.currentUser

  // This should only be called when the user is logged in, otherwerise the user will be null.
  if (user !== null) {
    // Accounts with Google or Facebook login do not need their emails to be verified.

    if (user.emailVerified) {
      res.status(EMAIL_VERIFIED).send("Email is Verified")
      return
    }

    await sendEmailVerification(user)
      .then(() => {
        res.status(200).send("Success.")
      })
      .catch((error) => {
        res.status(400).send("Try again later.")
      })
  } else {
    res.status(400).send("Try again later.")
  }
}
