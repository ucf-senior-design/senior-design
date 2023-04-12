import { NextApiRequest, NextApiResponse } from "next"
import { firebaseAuth, unpackArrayResponse } from "../../../../../utility/firebase"
import firebaseAdmin from "../../../../../utility/firebaseAdmin"
import { Duration } from "../../../../../utility/types/trip"
import { rMerge } from "ranges-merge"

/**
 * Handles all requests managing trip events
 * Base path : /api/trip/{tripID}/event/...
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripID = req.query.tripID as string
  const params = req.query.params

  switch (req.method) {
    /**
     * POST /api/trip/{tripID}
     * Creates a new event
     * body : Event
     */
    case "POST": {
      await firebaseAdmin
        .firestore()
        // Creates new event in the events subcollection for the trip.
        .collection(`Trips/${tripID}/events`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id
          const data = (await value.get()).data()
          res.status(200).send({ uid: id, ...data })
        })
        .catch(() => {
          res.status(400).send("Could not create event.")
        })
      break
    }

    /**
     * Handles multiple update functions for the trip such as: letting a user JOIN an event, LEAVE an event, or update other INFO about an event.
     *
     * These API calls need to follow one of the following structures:
     * JOIN EVENT - PUT /api/trip/{tripID}/join/{eventID}
     * LEAVE EVENT - PUT /api/trip/{tripID}/leave/{eventID}
     * UPDATE EVENT - PUT /api/trip/{tripID}/update/{eventID}
     *
     * Note: Do not pass in specific user information for this API, as we can already access the user's information through firebase since they should be logged in to access pages that use this API.
     */
    case "PUT": {
      // Check to make sure the API follows the required structures and the user is logged in.
      if (
        params === undefined ||
        params.length !== 2 ||
        (!params[0] &&
          params[0] !== "join" &&
          params[0] !== "leave" &&
          params[0] !== "info" &&
          params[0] !== "reschedule")
      ) {
        res.status(400).send("Invalid Params")
      } else {
        const purpose = params[0] // join | leave | info | reschedule
        const eventId = params[1]

        if (purpose === "reschedule") {
          await doEventReschedule(req, res, eventId, tripID)
          return
        }

        // Prevent updating attendees by using the /api/trip/{tripID}/update/{eventID} endpoint. Must use .../leave/{eventID} or .../join/{eventID} to do this.
        if (purpose === "info" && req.body !== undefined && req.body.attendees !== undefined) {
          res.status(400).send("Cannot update attendees.")
          return
        }

        const updateObj = () => {
          switch (purpose) {
            // Sets request to add the user to the array of attendees in firebase.
            case "join": {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayUnion(req.body.uid),
              }
            }
            // Sets the request to remove the user from the array of attendees in firebase.
            case "leave": {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayRemove(req.body.uid),
              }
            }
            // Given the new start and end date in the request body
            case "reschedule": {
              return { duration: { start: req.body.duration.start, end: req.body.duration.end } }
            }
            // Sets the request to update information about the event.
            case "info": {
              return req.body
            }
          }
          return {}
        }

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`) // gets event subcollection
          .doc(eventId) // gets event we are trying to update
          .update(updateObj()) // updates the necessary values
          .then(() => {
            res.status(200).send({})
          })
          .catch((e) => {
            console.log(e)
            res.status(400).send("Could not modify event.")
          })
      }

      break
    }

    /**
     * Deletes the event
     * DELETE api/trips/{tripID}/delete/{eventID}
     */
    case "DELETE": {
      if (params === undefined || params.length !== 1) {
        res.status(400).send("Invalid Params")
      } else {
        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .doc(params[0])
          .delete()
          .then(() => {
            res.status(200).send({})
          })
          .catch((e) => {
            res.status(400).send("Could not delete event.")
          })
      }
    }
  }
}

async function doEventReschedule(
  req: NextApiRequest,
  res: NextApiResponse,
  eventID: string,
  tripID: string,
) {
  const { duration, attendees }: { duration: Duration; attendees: Array<string> } = req.body
  try {
    let findAttendeeEvents = await firebaseAdmin
      .firestore()
      .collection(`Trips/${tripID}/events/`)
      .where("attendees", "array-contains-any", attendees)
      .get()

    let attendeeEvents = unpackArrayResponse(findAttendeeEvents.docs)

    let eventIntervals: Array<Array<number>> = [
      [new Date(duration.start).getTime(), new Date(duration.end).getTime()],
    ]

    attendeeEvents.forEach((event) => {
      if (event.uid !== eventID)
        eventIntervals.push([
          new Date(event.duration.start).getTime(),
          new Date(event.duration.end).getTime(),
        ])
    })

    // If the event can can be rescheduled at the time, then when merging in the time range w/ other events no overlap should occur so the length should stay the same.
    const PRE_MERGE_LENGTH = eventIntervals.length
    const MERGED_LENGTH = rMerge(eventIntervals as any)?.length ?? 0

    if (PRE_MERGE_LENGTH !== MERGED_LENGTH) {
      res.status(400).send("Conflict found. Can't reschedule.")
    } else {
      firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/events`)
        .doc(eventID)
        .update({ duration: duration })
        .then(() => {
          res.status(200).send({})
        })
    }
  } catch (e) {
    res.status(400).send("Cannot find reschedule event.")
  }
}
