import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      console.log(req.body);
      await firebaseAdmin.firestore().collection('Trips/').add(req.body);
      // .then(async (value) => {
      //   const id = (await value.get()).id;
      //   const data = (await value.get()).data();
      //   res.status(200).send({ uid: id, ...data });
      // })
      // .catch(() => {
      //   res.status(400).send('Could not create event.');
      // });
      res.status(200).send({});
      break;
    }
    case 'GET': {
      let trips = new Map<string, any>();
      const {
        query: { user },
      } = req;
      try {
        let allTrips = await firebaseAdmin
          .firestore()
          .collection('Trips/')
          .get();
        allTrips.forEach((doc) => {
          if (
            Object.hasOwn(doc.data(), 'attendees') &&
            doc.data()['attendees'].includes(user)
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
