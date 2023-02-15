import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      try {
        await firebaseAdmin.firestore().collection('Trips/').add(req.body);
        res.status(200).send({});
      } catch (e) {
        res.status(400).send('Error when creating trip.')
      }
      break;
    }
    case 'GET': {
      if (firebaseAuth.currentUser == null) {
        res.status(400).send('User is not logged in.')
        break;
      }

      try {
        const trips = await firebaseAdmin
          .firestore()
          .collection('Trips/').where('attendees', 'array-contains', firebaseAuth.currentUser.uid)
          .orderBy('duration.start')
          .get()
          .then( async (value) => {
            console.log(value)
            console.log(value.docs)
            // let itineraryEvents = unpackArrayResponse(value.docs);
          });
          res.status(200).send(trips);
      } catch (e) {
        console.log(e);
        res
          .status(400)
          .send(
            e
          );
      }
      break;
    }
}
}
