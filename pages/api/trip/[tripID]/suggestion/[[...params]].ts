import { NextApiRequest, NextApiResponse } from 'next';
import {
  firebaseAuth,
  unpackArrayResponse,
} from '../../../../../utility/firebase';
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
        .add(req.body.details)
        .then(async (value) => {
          const widgetID = value.id;
          const suggestions: Array<any> = [];

          const user = 'user';
          req.body.suggestions
            .forEach(async (suggestion: string, index: number) => {
              const suggestionObj = {
                owner: user,
                likes: [user],
                option: suggestion,
              };
              await firebaseAdmin
                .firestore()
                .collection(`Trips/${tripID}/suggestions/${widgetID}/options/`)
                .add(suggestionObj)
                .then((value) => {
                  suggestions.push({
                    uid: value.id,
                    ...suggestionObj,
                  });
                })
                .catch(() => {
                  res.status(400).send('Error adding optinos');
                });
            })
            .catch(() => {
              res.status(400).send('Error adding suggestion details');
            });

          await firebaseAdmin.firestore().batch().commit();
          res.status(200).send({
            widget: {
              uid: widgetID,
              ...req.body.details,
            },
            suggestions: suggestions,
          });
        });

      break;
    }

    case 'PUT': {
      const userID = firebaseAuth.currentUser?.uid;

      if (
        // firebaseAuth.currentUser === null ||
        params === undefined ||
        params.length == 0 ||
        (!params[0] &&
          params[0] !== 'like' &&
          params[0] !== 'unLike' &&
          params[0] !== 'add') ||
        (params[0] !== 'add' && params.length !== 3)
      ) {
        res.status(400).send('Invalid Params');
      } else {
        const purpose = params[0];
        const widgetId = params[1];

        const updateObj = () => {
          switch (purpose) {
            case 'like': {
              return {
                likes: firebaseAdmin.firestore.FieldValue.arrayUnion(userID),
              };
            }
            case 'unLike': {
              return {
                likes: firebaseAdmin.firestore.FieldValue.arrayRemove(userID),
              };
            }
            case 'add': {
              return {
                owner: userID,
                likes: [userID],
                option: req.body.suggestion,
              };
            }
          }
          return {};
        };

        if (purpose === 'add') {
          firebaseAdmin
            .firestore()
            .collection(`Trips/${tripID}/suggestions/${widgetId}/options`)
            .add(updateObj())
            .then(async (value) => {
              const id = (await value.get()).id;
              const data = (await value.get()).data();
              res.status(200).send({ uid: id, ...data });
            })
            .catch(() => {
              res.status(400).send('Could not create suggestion widget.');
            });
        } else {
          const suggestionID = params[2];
          await firebaseAdmin
            .firestore()
            .collection(`Trips/${tripID}/suggestions/${widgetId}/options`)
            .doc(suggestionID)
            .update(updateObj())
            .then(() => {
              res.status(200).send({});
            })
            .catch((e) => {
              res.status(400).send('Could not modify suggestion widget.');
            });
        }
      }
      break;
    }

    case 'GET':
      {
        // Gets basic information about all suggestion widgets in the trip
        if (params === undefined) {
          await firebaseAdmin
            .firestore()
            .collection(`Trips/${tripID}/suggestions/`)
            .get()
            .then((value) => {
              const suggestions = unpackArrayResponse(value.docs);
              res.status(200).send(suggestions);
            })
            .catch((e) => {
              res.status(400).send('Error getting polls');
            });
        } else {
          await firebaseAdmin
            .firestore()
            .collection(`Trips/${tripID}/suggestions`)
            .doc(params[0])
            .get()
            .then((suggestion) => {
              firebaseAdmin
                .firestore()
                .collection(`Trips/${tripID}/suggestions/${params[0]}/options`)
                .get()
                .then((values) => {
                  let suggestions = unpackArrayResponse(values.docs);
                  res.status(200).send({
                    uid: params[0],
                    ...suggestion.data(),
                    suggestions: suggestions,
                  });
                })
                .catch((e) => {
                  res.status(400).send('Error getting Options');
                  return;
                });
            })
            .catch((e) => {
              res.status(400).send('Could not get suggestion.');
              return;
            });
        }
      }
      break;

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
