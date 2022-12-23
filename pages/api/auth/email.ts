import { sendEmailVerification } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthentication } from '../../../utility/firebaseApp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | boolean>
) {
  if (req.method === 'POST') {
    const user = getAuthentication().currentUser;

    if (user !== null) {
      await sendEmailVerification(user)
        .then(() => {
          res.status(200).send('Success');
        })
        .catch((error) => {
          res.status(400).send('Try again later.');
        });
    } else {
      res.status(400).send('Try again later.');
    }
  }
}
