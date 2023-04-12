import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { createFriendPairing } from "../../../../../utility/helper"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let friendID = req.query.friendID as string
  let user = req.query.uid as string

  if (req.method !== "POST") {
    res.status(400).send("This endpoint does not exist")
  } else {
    if (await hasConnection(user, friendID)) {
      res.status(400).send("Connection already exists.")
    }

    let pairingData = {
      pairing: [user, friendID],
      status: {
        state: "pending",
        modifier: user,
      },
    }

    let uid = createFriendPairing(friendID, user)
    await firebaseAdmin
      .firestore()
      .collection("Friends/")
      .doc(uid)
      .set(pairingData)
      .then(async (value) => {
        let friendDetais = await firebaseAdmin.firestore().collection("Users").doc(friendID).get()

        let friendData = friendDetais.data()

        res.status(200).send({
          uid: uid,
          friend: {
            name: friendData === undefined ? undefined : friendData.name,
            photoURL: friendData === undefined ? undefined : friendData.photoURL,
          },
          ...pairingData,
        })
      })

      .catch((e) => {
        res.status(400).send(e)
      })
  }
}
async function hasConnection(user1: string, user2: string) {
  let result = await firebaseAdmin
    .firestore()
    .collection("Friends")
    .doc(createFriendPairing(user1, user2))
    .get()

  return result.exists
}
