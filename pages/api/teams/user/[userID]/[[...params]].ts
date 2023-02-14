import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from '../../../../../utility/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query.params;
  const userID = req.query.userID as string;

  switch (req.method) {
    case 'GET': {
        // Gets all teams of a particular user
        let teams: string[] = new Array<string>();
        try {
            let allTeams= await firebaseAdmin.firestore().collection('Teams/').get();
            allTeams.forEach((doc) => {
                if (Object.hasOwn(doc.data(), 'members') && userID != null && doc.data()['members'].includes(userID)) {
                    teams.push(doc.id)
                }
            });
            res.status(200).send(teams);
        } catch (e) {
            res.status(400).send('Error when loading teams');
        }
        break;
    }

  }
}
