import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { Poll } from '../../../utility/types/trip';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const pollID = req.body.pollID;
  const tripID = req.body.tripID as string;
  const index = req.body.index;

  switch (req.method) {
    case 'POST': {
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
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/polls`)
        .doc(pollID)
        .get()
        .then((doc) => {
          let docData = doc.data() as Poll;
          let user = firebaseAuth.currentUser;
          if (user === null) {
            res.status(400).send('Not Authenticated');
            return;
          }
          docData.options[index].voters.push(user.uid);
          doc.ref.update(docData);
        })
        .then(() => res.status(200).send({}))
        .catch((e) => res.status(400).send(e));

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
