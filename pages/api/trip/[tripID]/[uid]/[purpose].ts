import { NextApiRequest, NextApiResponse } from "next"
import { unpackArrayResponse } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { getTripInfo } from "../../../../../utility/types/trip"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const uid = req.query.uid as string
  const purpose = req.query.purpose as getTripInfo

  if (purpose === "trip") {
    if (tripID === "none") {
      await firebaseAdmin
        .firestore()
        .collection(`Trips`)
        .where("attendees", "array-contains", uid)
        .orderBy("duration.start")
        .get()
        .then((value) => {
          const trips = unpackArrayResponse(value.docs)
          res.status(200).send(trips)
        })
        .catch((e) => {
          res.status(400).send("Error when loading trips")
        })
    } else {
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
    }
  }

  if (purpose === "event") {
    let joinableEvents: Array<any> = []
    let itineraryEvents: Array<any> = []

    await firebaseAdmin
      .firestore()
      .collection(`Trips/${tripID}/events`)
      .where("attendees", "array-contains", uid)
      .orderBy("duration.start")
      .get()
      .then(async (value) => {
        itineraryEvents = unpackArrayResponse(value.docs)

        await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .orderBy("attendees")
          .where("attendees", "not-in", [[uid]])
          .orderBy("duration.start")
          .get()
          .then(async (value) => {
            joinableEvents = unpackArrayResponse(value.docs)

            res.status(200).send({
              joinable: joinableEvents ?? [],
              itinerary: itineraryEvents ?? [],
            })
          })
          .catch((e) => {
            res.status(400).send("Could not find joinable events user is in.")
            return
          })
      })
      .catch((e) => {
        res.status(400).send("Could not find events user is in.")
        return
      })
  }
}
