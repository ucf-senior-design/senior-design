import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../../../../utility/firebase"
import firebaseAdmin from "../../../../../../utility/firebaseAdmin"

function findEventIndex(intervals: any, eventID: string) {
  let i
  for (i = 0; i < intervals.length; i += 1) {
    const [start, end, uid] = intervals[i]
    if (uid === eventID) break
  }
  if (i === intervals.length) return -1
  return i
}

function mergeIntervals(intervals: any, eventID: string) {
  const indexToRemove: number = findEventIndex(intervals, eventID)
  if (indexToRemove === -1) {
    return -1
  }

  let result = [[intervals[0][0], intervals[0][1]]]
  const length: number = intervals.length
  for (let i = 1; i < length; i += 1) {
    if (intervals[i][0] <= result[result.length - 1][1]) {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1])
    } else {
      result.push(intervals[i])
    }
  }
  return result.length
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const eventID = req.query.eventID as string // event to reschedule
  switch (req.method) {
    case "PUT": {
      const newInterval = req.body.newInterval
      try {
        // Get events from firebase and translate date to intervals
        // ***QUERY HERE***
        // Find the other events that a user is in
        // How to do that ^

        /**
         * GET /api/trip/{tripID}
         * Gets all events in a user's itinerary and any events they are able to join as well.
         */
        if (firebaseAuth.currentUser === null) {
          console.log("User is not logged in")
          return
        }
        const userID = firebaseAuth.currentUser.uid
        let joinableEvents: Array<any> = []
        let itineraryEvents: Array<any> = []

        await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .where("attendees", "array-contains", userID)
          .orderBy("duration.start")
          .get()
          .then(async (value) => {
            itineraryEvents = unpackArrayResponse(value.docs)
            await firebaseAdmin
              .firestore()
              .collection(`Trips/${tripID}/events`)
              .orderBy("attendees")
              .where("attendees", "not-in", [[userID]])
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
          })

        const intervals: any = []

        let mything = await firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events/`)
          .where("attendees", "array-contains", firebaseAuth.currentUser.uid)
          .orderBy("duration.start")
          .get()

          .catch((e) => {
            res.status(400).send("Could not find events user is in.")
            return
          })

        console.log("HEY YOU!")
        console.log(mything)

        const length = mergeIntervals(intervals, eventID)

        if (length === -1 || length === intervals.length) {
          res.status(400).send("Conflict found. Can't reschedule.")
        } else {
          try {
            // *** UPDATE EVENT START AND END TIME HERE ***
            // const docRef = doc(firebaseDatbase, "Trips", tripID);
            // await updateDoc(docRef, {
            //     start: newInterval.start,
            //     end: newInterval.end
            // });
            // }
            // res.status(200).send(docRef.id);
          } catch (e) {
            res.status(400).send("Error when updating team.")
          }
          res.status(200).send("👍")
        }
      } catch (e) {
        console.log(e)
        res.status(400).send("Error when executing trip query.")
      }
      break
    }
  }
}
