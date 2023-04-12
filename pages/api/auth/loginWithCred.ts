import type { NextApiRequest, NextApiResponse } from "next"
import { MUST_ADD_DETAILS } from "../../../utility/constants"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { User } from "../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let u = req.body.user
  if (u === undefined || u === null) {
    res.status(400).send("Try again later.")
  }
  const maybeUser = (
    await firebaseAdmin.firestore().collection("Users").where("uid", "==", u.uid).get()
  ).docs[0]

  // Looks to see if user has filled out their details yet by seeing if there is a doc in the "Users" collection with the user's uid.
  if (maybeUser === undefined) {
    res.status(MUST_ADD_DETAILS).send({
      uid: u.uid,
      email: u.email,
      name: u.displayName,
      photo: u.photoURL,
    })
    return
  }

  const user = maybeUser.data() as any as User
  res.status(200).send(user)
}
