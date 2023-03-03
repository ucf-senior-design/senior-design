import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let user = firebaseAuth.currentUser
  if (req.method !== "GET") {
    res.status(400).send("This endpoint does not exist")
  } else if (user === null) {
    res.status(400).send("User does not exist")
  } else {
    await firebaseAdmin
      .firestore()
      .collection("Friends")
      .where("pairing", "array-contains", user.uid)
      .get()
      .then((value) => {
        res.status(200).send(unpackArrayResponse(value.docs))
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  }
}
