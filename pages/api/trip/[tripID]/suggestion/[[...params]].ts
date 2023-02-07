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
      await firebaseAdmin
        .firestore()
        .collection(`Trips/${tripID}/suggestions`)
        .add(req.body)
        .then(async (value) => {
          const id = (await value.get()).id;
          const data = (await value.get()).data();
          res.status(200).send({ uid: id, ...data });
        })
        .catch(() => {
          res.status(400).send('Could not create suggestion widget.');
        });
      break;
    }

    case 'PUT': {
      if (
        firebaseAuth.currentUser === null ||
        params === undefined ||
        params.length !== 2 ||
        (!params[0] &&
          params[0] !== 'addLike' &&
          params[0] !== 'removeLike' &&
          params[0] !== 'update')
      ) {
        res.status(400).send('Invalid Params');
      } else {
        const purpose = params[0];
        const widgetId = params[1];

        if (purpose === 'info' && req.body !== undefined) {
          res.status(400).send('Cannot update suggestion widget.');
          return;
        }

        const updateObj = () => {
          switch (purpose) {
            case 'addLike': {
              return {
                likes: firebaseAdmin.firestore.FieldValue.arrayUnion(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            case 'removeLike': {
              return {
                likes: firebaseAdmin.firestore.FieldValue.arrayRemove(
                  firebaseAuth.currentUser?.uid
                ),
              };
            }
            case 'update': {
              return req.body;
            }
          }
          return {};
        };

        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/events`)
          .doc(widgetId)
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

    case 'GET': {
      if (params === undefined || params.length !== 1) {
        res.status(400).send('Invalid Params');
      } else {
        firebaseAdmin
          .firestore()
          .collection(`Trips/${tripID}/suggestions`)
          .doc(params[0])
          .get()
          .then((suggestion) => {
            res.status(200).send(suggestion.data());
          })
          .catch((e) => {
            res.status(400).send('Could not get suggestion.');
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
          .collection(`Trips/${tripID}/suggestions`)
          .doc(params[0])
          .delete()
          .then(() => {
            res.status(200).send({});
          })
          .catch((e) => {
            res.status(400).send('Could not delete suggestion.');
          });
      }
      break;
    }
  }
}
