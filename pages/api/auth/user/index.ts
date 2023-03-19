import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../utility/firebase"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      if (firebaseAuth.currentUser !== null) {
        res.status(200).send(firebaseAuth.currentUser.toJSON())
      } else {
        res.status(400).send("Not Logged In.")
      }
    }
  }
}
