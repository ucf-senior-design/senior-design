import { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventID, tripID, method, uid } = req.body
  await firebaseAdmin
    .firestore()
    .collection(`Trips/${tripID}/events`) // gets event subcollection
    .doc(eventID) // gets event we are trying to update
    .update({
      attendees:
        method === "join"
          ? firebaseAdmin.firestore.FieldValue.arrayUnion(uid)
          : firebaseAdmin.firestore.FieldValue.arrayRemove(req.body.uid),
    }) // updates the necessary values
    .then(() => {
      res.status(200).send({})
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send("Could not modify event.")
    })
}
