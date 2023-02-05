import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      console.log(req.body);
      try {
      await firebaseAdmin.firestore().collection('Trips/').add(req.body);
      } catch (e) {
        res.status(400).send('Error when creating trip.')
      }
      res.status(200).send({});
      break;
    }
    case 'GET': {
      if (firebaseAuth.currentUser == null) {
        res.status(400).send('User is not logged in.')
      }
      
      let trips = new Map<string, any>();
      try {
        let allTrips = await firebaseAdmin
          .firestore()
          .collection('Trips/')
          .get();
        allTrips.forEach((doc) => {
          if (
            Object.hasOwn(doc.data(), 'attendees') &&
            doc.data()['attendees'].includes(firebaseAuth.currentUser.uid)
          ) {
            trips.set(doc.id, doc.data());
          }
        });
      } catch (e) {
        res
          .status(400)
          .send(
            'Error when loading trips'
          );
      }
      res.status(200).send(Object.fromEntries(trips));
      break;
    }

    // case 'DELETE': {
    // }
  }
  const tripID = req.query.tripID as string;
  const params = req.query.params;
}
