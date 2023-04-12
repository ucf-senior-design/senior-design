import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"
import { Friendship } from "../../../../utility/types/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uid = req.query.uid as string
  await firebaseAdmin
    .firestore()
    .collection("Friends")
    .where("pairing", "array-contains", uid)
    .get()
    .then(async (value) => {
      let friendShipDetails = unpackArrayResponse(value.docs)
      let friends: Array<Friendship> = []

      for (let i = 0; i < friendShipDetails.length; i++) {
        let friend = friendShipDetails[i]
        let friendDetais = await firebaseAdmin
          .firestore()
          .collection("Users")
          .doc(friend.pairing[0] === uid ? friend.pairing[1] : friend.pairing[0])
          .get()

        let friendData = friendDetais.data()
        friends.push({
          ...friend,
          friend: {
            name: friendData === undefined ? undefined : friendData.name,
            photoURL: friendData === undefined ? undefined : friendData.photoURL,
          },
        })
      }

      res.status(200).send({ friends: friends })
    })
    .catch((e) => {
      res.status(400).send(e)
    })
}
