import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseDatbase } from '../../../../utility/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query.params;
  const teamID = req.query.teamID as string;

  switch (req.method) {
    case 'GET': {
        // Returns members of a team given a team name or id
        try {
            const docRef = doc(firebaseDatbase, "Teams", teamID);
            const team = await (await getDoc(docRef)).data;
            res.status(200).send(team);
        } catch (e) {
            res.status(400).send('Error when executing team query.')
        }
        break;
    }

    case 'PUT': {
        // Adds a user to a team given a userID
        let userID = req.body; 
        try {
            const docRef = doc(firebaseDatbase, "Teams", teamID);
            await updateDoc(docRef, {
                members: arrayUnion(userID)
            });
        } catch (e) {
            res.status(400).send('Error when updating team.')
        }
        break;
    }

    case 'DELETE': {
        // Deletes a user from a team given userID
        let userID = req.body; 
        try {
            const docRef = doc(firebaseDatbase, "Teams", teamID);
            await updateDoc(docRef, {
                members: arrayRemove(userID)
            });
        } catch (e) {
            res.status(400).send('Error when updating team.')
        }
        break;
    }
  }
}
