import { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      // assume req.body is a valid team
      try {
        let trip = await firebaseAdmin.firestore().collection("Teams/").add(req.body)
        res.status(200).send({ uid: trip.id, team: (await trip.get()).data() })
      } catch (e) {
        res.status(400).send("Error when creating team.")
      }
      break
    }
  }
}
