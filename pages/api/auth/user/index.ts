import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT": {
      await firebaseAdmin
        .firestore()
        .collection("Users")
        .doc(req.body.uid)
        .update(req.body)
        .catch((e) => {
          res.status(400).send("Cannot update")
        })
        .then(() => {
          res.status(200).send({})
        })

      break
    }
  }
}
