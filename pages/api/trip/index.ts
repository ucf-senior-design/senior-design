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

      let trips: string[] = new Array<string>();
      try {
        let allTrips = await firebaseAdmin
          .firestore()
          .collection('Trips/')
          .get();
        allTrips.forEach((doc) => {
          if (
            Object.hasOwn(doc.data(), 'attendees') && firebaseAuth.currentUser != null &&
            doc.data()['attendees'].includes(firebaseAuth.currentUser.uid)
          ) {
            trips.push(doc.id);
          }
        });
      } catch (e) {
        res
          .status(400)
          .send(
            'Error when loading trips'
          );
      }
      res.status(200).send(trips);
      break;
    }

    case 'DELETE': {
      let tripID = req.body
      if (tripID == undefined || tripID.length == 0) {
        res.status(400).send('tripID is undefined')
      } else {
      firebaseAdmin
        .firestore()
        .collection(`Trips/`)
        .doc(tripID)
        .delete()
        .then(() => {
          res.status(200).send({});
        })
        .catch((e) => {
          console.log(e)
          res.status(400).send('Could not delete trip.');
        });
      }
      break;
  }
}
}
