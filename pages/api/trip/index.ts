import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      await firebaseAdmin
        .firestore()
        .collection("Trips/")
        .add(req.body)
        .then((value) => {
          res.status(200).send({ uid: value.id, ...req.body })
        })
        .catch((e) => {
          res.status(400).send("Error when creating trip.")
        })

      break
    }
  }
}
