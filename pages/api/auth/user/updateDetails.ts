import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (firebaseAuth.currentUser === null) {
    res.status(400).send("Must log in.")
  }

  await firebaseAdmin
    .firestore()
    .collection("Users")
    .doc(firebaseAuth.currentUser?.uid ?? "")
    .update(req.body)
    .catch((e) => {
      res.status(400).send("Cannot update")
    })
    .then(() => {
      res.status(200).send({})
    })
}
