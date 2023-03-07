import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { ActivityPrefField } from "../../../../../utility/types/trip"

/**
 * Endpoints for handling the following paths
 * POST /trip/[tripID]/activityPref - Create a actvity preference widget
 * PUT /trip/[tripID]/activityPref - Add user's activity prefrence
 * DELETE /trip/[tripID]/activityPref - Delete user activity widget
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const params = req.query.params

  switch (req.method) {
    /**
     * POST /trip/[tripID]/activityPref - Create a actvity preference widget
     * body : ActivityPreference
     */

    case "POST": {
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/activityPref`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id
          const data = (await value.get()).data()
          res.status(200).send({ uid: id, ...data })
        })
        .catch(() => {
          res.status(400).send("Could not create widget.")
        })
      break
    }

    /**
     * PUT /trip/[tripID]/activityPref - Add user's activity prefrence
     * body: { votes: Array<ActivityPrefField>; activityPrefID: string }
     */
    case "PUT": {
      const { votes, activityPrefID }: { votes: Array<ActivityPrefField>; activityPrefID: string } =
        req.body

      if (firebaseAuth.currentUser?.uid === null) {
        res.status(400).send("User not signed in.")
        return
      }
      const updateObj = {}
      const addUserToList = firebaseAdmin.firestore.FieldValue.arrayUnion(
        firebaseAuth.currentUser?.uid,
      )

      votes.forEach((vote) => {
        switch (vote) {
          case "SPORTS": {
            Object.assign(updateObj, { sports: addUserToList })
            break
          }
          case "SIGHTSEEING": {
            Object.assign(updateObj, { sightseeing: addUserToList })
            break
          }
          case "NATURE": {
            Object.assign(updateObj, { nature: addUserToList })
            break
          }
          case "LOWPRICE": {
            Object.assign(updateObj, { lowPrice: addUserToList })
            break
          }
          case "MEDPRICE": {
            Object.assign(updateObj, { medPrice: addUserToList })
            break
          }
          case "HIGHPRICE": {
            Object.assign(updateObj, { highPrice: addUserToList })
            break
          }
          case "VERYHIGHPRICE": {
            Object.assign(updateObj, { veryHighPrice: addUserToList })
            break
          }
        }
      })

      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/activityPref/`)
        .doc(activityPrefID)
        .update(updateObj)
        .then(async (value) => {
          res.status(200).send("Updated preferences")
        })
        .catch(() => {
          res.status(400).send("Could not create widget.")
        })
      break
    }

    /**
     * DELETE /trip/[tripID]/activityPref - Delete user activity widget
     */
    case "DELETE": {
      if (!params || params.length !== 1) {
        res.status(400).send("Invalid params.")
        return
      }

      const activityPrefID = params[0]
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/activityPref`)
        .doc(activityPrefID)
        .delete()

        .then(() => {
          res.status(200).send("Deleted Widget")
        })
        .catch(() => {
          res.status(400).send("Could not get widget.")
        })
      break
    }
  }
}
