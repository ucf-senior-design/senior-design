import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../../../../utility/firebase';
import firebaseAdmin from '../../../../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tripID = req.query.tripID as string;
  const widgetID = req.query.widgetID as string;

  const user = firebaseAuth.currentUser;
  switch (req.method) {
    case 'DELETE': {
      if (user === null) {
        res.status(400).send('Please log in before using this endpoint.');
        return;
      }

      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/availabillity`)
        .doc(widgetID)
        .delete()
        .then(() => {
          res.status(200).send('Success');
        })
        .catch((e) => res.status(400).send(e));
      break;
    }
    default: {
      res.status(400).send('Endpoint not found.');
    }
  }
}
