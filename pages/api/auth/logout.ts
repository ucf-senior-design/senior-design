import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../utility/firebase"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  firebaseAuth
    .signOut()
    .then(() => {
      res.status(200).send("Signed Out.")
    })
    .catch(() => {
      res.status(400).send("Error Signing Out.")
    })
}
