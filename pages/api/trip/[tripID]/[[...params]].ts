import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, firebaseDatbase } from "../../../../utility/firebase"
import firebaseAdmin from "../../../../utility/firebaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const params = req.query.params
  switch (req.method) {
    case "GET": {
      await firebaseAdmin
        .firestore()
        .collection(`Trips/`)
        .doc(tripID)
        .get()
        .then((value) => {
          res.status(200).send({ ...value.data(), uid: value.id })
        })
        .catch((e: any) => {
          res.status(400).send("Could not get trip.")
        })
      break
    }
    case "DELETE": {
      if (tripID == undefined || tripID.length == 0) {
        res.status(400).send("tripID is undefined")
      } else {
        await firebaseAdmin
          .firestore()
          .collection(`Trips/`)
          .doc(tripID)
          .delete()
          .then(() => {
            res.status(200).send({})
          })
          .catch((e: any) => {
            res.status(400).send("Could not delete trip.")
          })
      }
      break
    }

    case "PUT": {
      if (
        params === undefined ||
        firebaseAuth.currentUser === null ||
        (params[0] !== "join" &&
          params[0] !== "leave" &&
          params[0] !== "modify" &&
          params[0] !== "layout")
      ) {
        res.status(400).send("Invalid purpose")
        return
      } else {
        const purpose = params[0]
        const userID = firebaseAuth.currentUser?.uid

        try {
          const docRef = doc(firebaseDatbase, "Trips", tripID)
          switch (purpose) {
            case "join": {
              await updateDoc(docRef, {
                attendees: arrayUnion(userID),
              })
              break
            }
            case "leave": {
              await updateDoc(docRef, {
                attendees: arrayRemove(userID),
              })
              break
            }
            case "modify": {
              if (req.body !== null && req.body !== undefined) {
                await updateDoc(docRef, {
                  destination: req.body.destination,
                  duration: req.body.duration,
                })
              }
              break
            }
            case "layout": {
              if (req.body.layout !== null && req.body.layout !== undefined) {
                await updateDoc(docRef, {
                  layout: req.body.layout,
                })
              } else {
                res.status(400).send("Missing Layout")
                return
              }
              break
            }
          }
          res.status(200).send("Success.")
        } catch (e: any) {
          console.log(e)
          res.status(400).send("Error when updating trip.")
        }
        break
      }
    }
  }
}
