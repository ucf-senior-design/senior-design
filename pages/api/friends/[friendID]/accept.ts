import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"
import { createFriendPairing } from "../../../../utility/helper"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let friendID = req.query.friendID as string
  let user = firebaseAuth.currentUser
  if (req.method !== "PUT") {
    res.status(400).send("This endpoint does not exist")
  } else if (user === null) {
    res.status(400).send("User does not exist")
    return
  } else {
    await firebaseAdmin
      .firestore()
      .collection("Friends")
      .doc(createFriendPairing(friendID, user.uid))
      .update({
        status: {
          state: "accepted",
          modifier: user?.uid,
        },
      })
      .then(() => {
        res.status(200).send({
          status: {
            state: "accepted",
            modifier: user?.uid,
          },
        })
      })
      .catch((e) => {
        res.status(400).send(e)
      })
  }
}
