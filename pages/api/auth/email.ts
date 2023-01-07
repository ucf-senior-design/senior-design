import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | boolean>
) {
  const user = firebaseAuth.currentUser;

  if (req.body.purpose === 'email') {
    if (user !== null) {
      if (user.emailVerified || user.providerId !== 'password') {
        res.status(201).send('Email is Verified');
        return;
      }
      await sendEmailVerification(user)
        .then(() => {
          res.status(200).send('Success.');
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send('Try again later.');
        });
    } else {
      res.status(400).send('Try again later.');
    }
  } else if (req.body.purpose === 'password') {
    if (user?.providerId !== 'password' || user.email === undefined) {
      res.status(400).send('Password cannot be reset.');
      return;
    }
    await sendPasswordResetEmail(firebaseAuth, user.email ?? '')
      .then(() => {
        res.status(200).send('Success.');
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send('Try again Later.');
      });
  }
}
