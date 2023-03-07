import { NextApiRequest, NextApiResponse } from "next"
import { unpackArrayResponse } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userID = req.query.userID as string

  switch (req.method) {
    case "GET": {
      try {
        await firebaseAdmin
          .firestore()
          .collection("Teams/")
          .where("members", "array-contains", userID)
          .get()
          .then((value) => {
            const teams = unpackArrayResponse(value.docs)
            res.status(200).send(JSON.stringify({ teams: teams }))
          })
      } catch (e) {
        res.status(400).send("Error when loading teams")
      }
      break
    }
  }
}
