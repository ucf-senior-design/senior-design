import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../../../utility/firebase';
import firebaseAdmin from '../../../../../utility/firebaseAdmin';

/**
 * Handles all requests managing trip events
 * Base path : /api/trip/{tripID}/event/...
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tripID = req.query.tripID as string;
  const params = req.query.params;

  switch (req.method) {
    /**
     * POST /api/trip/{tripID}
     * Creates a new event
     * body : Event
     */
    case 'POST': {
      await firebaseAdmin
        .firestore()
        // Creates new event in the events subcollection for the trip.
        .collection(`Trips/${tripID}/events`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id;
          const data = (await value.get()).data();
          res.status(200).send({ uid: id, ...data });
        })
        .catch(() => {
          res.status(400).send('Could not create event.');
        });
      break;
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
    case 'PUT': {
      // Check to make sure the API follows the required structures and the user is logged in.
      if (
        firebaseAuth.currentUser === null ||
        params === undefined ||
        params.length !== 2 ||
        (!params[0] &&
          params[0] !== 'join' &&
          params[0] !== 'leave' &&
          params[0] !== 'info')
      ) {
        res.status(400).send('Invalid Params');
      } else {
        const purpose = params[0]; // join | leave | info
        const eventId = params[1];

        // Prevent updating attendees by using the /api/trip/{tripID}/update/{eventID} endpoint. Must use .../leave/{eventID} or .../join/{eventID} to do this.
        if (
          purpose === 'info' &&
          req.body !== undefined &&
          req.body.attendees !== undefined
        ) {
          res.status(400).send('Cannot update attendees.');
          return;
        }

        const updateObj = () => {
          switch (purpose) {
            // Sets request to add the user to the array of attendees in firebase.
            case 'join': {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayUnion(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            // Sets the request to remove the user from the array of attendees in firebase.
            case 'leave': {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayRemove(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            // Sets the request to update information about the event.
            case 'info': {
              return req.body;
            }
          }
          return {};
        };

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`) // gets event subcollection
          .doc(eventId) // gets event we are trying to update
          .update(updateObj()) // updates the necessary values
          .then(() => {
            res.status(200).send({});
          })
          .catch((e) => {
            res.status(400).send('Could not modify event.');
          });
      }

      break;
    }

    /**
     * Deletes the event
     * DELETE api/trips/{tripID}/delete/{eventID}
     */
    case 'DELETE': {
      if (params === undefined || params.length !== 1) {
        res.status(400).send('Invalid Params');
      } else {
        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .doc(params[0])
          .delete()
          .then(() => {
            res.status(200).send({});
          })
          .catch((e) => {
            res.status(400).send('Could not delete event.');
          });
      }
    }
  }
}
