import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';

function IncrementArray(doc) {
  let docData = _.cloneDeep(data)
  docData[index] += 1
  return docData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // HOW TO GET POLL ID
  const pollID = req.body.pollID;
  const tripID = req.body.tripID as string;
  const index = req.body.index;

  switch (req.method) {
    // case 'GET': {
    //   console.log(req.body);
    //   await firebaseAdmin
    //     .firestore()
    //     .collection(`Trips/sample/polls`)
    //     .get()
    //     .then(async (value) => {
    //       // WHAT SHOULD BE SENT HERE
    //       res.status(200).send({value});
    //     })
    //     .catch(() => {
    //       res.status(400).send('Could not get poll.');
    //     });
    //   break;
    // }

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
        firebaseAuth.currentUser === null || results == undefined
        || index == undefined
      ) {
        res.status(400).send('Invalid Poll');

      // ELSE IS VALID
      } else {
        const updateObj = () => {
          return {
            participants: firebaseAdmin.firestore.FieldValue.arrayUnion(
            firebaseAuth.currentUser?.uid
            ),
            // HOW TO INCREMENT RESULTS - THIS IS WRONG
            results: IncrementArray(results, index)
          };             
        };

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/polls`)
          .doc(pollID)
          .get
          .update(IncrementArray(doc))
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
