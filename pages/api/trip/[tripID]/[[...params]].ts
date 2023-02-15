import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from 'next';
import { firebaseDatbase } from "../../../../utility/firebase";
import firebaseAdmin from "../../../../utility/firebaseAdmin";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const tripID = req.query.tripID as string;
    const params = req.query.params;
    switch (req.method) {
        case 'DELETE': {
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
            .catch((e: any) => {
            console.log(e)
            res.status(400).send('Could not delete trip.');
            });
        }
        break;
    }

    case 'PUT': {
        const purpose = req.body.purpose
        if (purpose != 'join' && purpose != 'leave') {
        res.status(400).send('Invalid purpose')
        } else {

        const userID = req.body.userID; 
        try {
            const docRef = doc(firebaseDatbase, "Trips", tripID);
            switch (purpose) {
            case 'join': {
                await updateDoc(docRef, {
                attendees: arrayUnion(userID)
                });
                break
            }
            case 'leave': {
                await updateDoc(docRef, {
                attendees: arrayRemove(userID)
                });
                break
            }
            }
            res.status(200).send(docRef.id);
        } catch (e: any) {
            res.status(400).send('Error when updating trip.');
        }
        break;  
        }
    }
        
    }
}
