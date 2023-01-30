import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // HOW TO GET POLL ID
  const pollID = req.query.params;
  const tripID = req.query.tripID as string;

  switch (req.method) {
    case 'GET': {
      console.log(req.body);
      await firebaseAdmin
        .firestore()
        .collection(`Trips/sample/polls`)
        .get()
        .then(async (value) => {
          // WHAT SHOULD BE SENT HERE
          res.status(200).send({value});
        })
        .catch(() => {
          res.status(400).send('Could not get poll.');
        });
      break;
    }
    case 'POST': {
      console.log(req.body);
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/polls`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id;
          const data = (await value.get()).data();
          res.status(200).send({ uid: id, ...data });
        })
        .catch(() => {
          res.status(400).send('Could not create poll.');
        });
      break;
    }

    case 'PUT': {
      // IF INVALID
      if (
        firebaseAuth.currentUser === null
      ) {
        res.status(400).send('Invalid User');

      // ELSE IS VALID
      } else {

        // IF TRYING TO UPDATE UNDEFINED FIELD THEN 400
        if (
          req.body !== undefined &&
          req.body.participants !== undefined
        ) {
          res.status(400).send('Cannot update attendees.');
          return;
        }

        const updateObj = () => {
          return {
            participants: firebaseAdmin.firestore.FieldValue.arrayUnion(
            firebaseAuth.currentUser?.uid
            ),
            // HOW TO INCREMENT RESULTS - THIS IS WRONG
            results: firebaseAdmin.firestore.FieldValue.increment(1)
          };             
        };

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/polls`)
          .doc(pollID)
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
      if (pollID === undefined) {
        res.status(400).send('Invalid Poll');
      } else {
        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/polls`)
          .doc(pollID)
          .delete()
          .then(() => {
            res.status(200).send({});
          })
          .catch((e) => {
            res.status(400).send('Could not create poll.');
          });
      }
    }
  }
}
