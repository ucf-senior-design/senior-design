import type { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../utility/firebase"
import firebaseAdmin from "../../../utility/firebaseAdmin"
import { Friendship } from "../../../utility/types/user"

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
      .then(async (value) => {
        let friendShipDetails = unpackArrayResponse(value.docs)
        let friends: Array<Friendship> = []

        for (let i = 0; i < friendShipDetails.length; i++) {
          let friend = friendShipDetails[i]
          let friendDetais = await firebaseAdmin
            .firestore()
            .collection("Users")
            .doc(friend.pairing[0] === user?.uid ? friend.pairing[1] : friend.pairing[0])
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
}
