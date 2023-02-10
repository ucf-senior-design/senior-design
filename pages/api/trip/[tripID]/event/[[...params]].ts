import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../../../utility/firebase';
import firebaseAdmin from '../../../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tripID = req.query.tripID as string;
  const params = req.query.params;

  switch (req.method) {
    case 'POST': {
      console.log(req.body);
      await firebaseAdmin
        .firestore()
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

    case 'PUT': {
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
        const purpose = params[0];
        const eventId = params[1];

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
            case 'join': {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayUnion(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            case 'leave': {
              return {
                attendees: firebaseAdmin.firestore.FieldValue.arrayRemove(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            case 'info': {
              return req.body;
            }
          }
          return {};
        };

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .doc(eventId)
          .update(updateObj())
          .then(() => {
            res.status(200).send({});
          })
          .catch((e) => {
            res.status(400).send('Could not create event.');
          });
      }

      break;
    }

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
