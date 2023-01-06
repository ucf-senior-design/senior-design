import auth from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { User } from '../../../utility/types/user';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | string>
) {
  let user: User = {
    uid: req.body.uid,
    email: req.body.email,
    profilePic: '',
    name: req.body.name,
    username: req.body.username,
    medicalInfo: req.body.medicalInfo,
    allergies: req.body.allergies,
  };

  try {
    const usersWithUsername = await firebaseAdmin
      .firestore()
      .collection('Users')
      .where('username', '==', req.body.username)
      .get();

    if (usersWithUsername.docs.length > 0) {
      res.status(400).send('Username taken.');
      return;
    }
    await firebaseAdmin.firestore().collection('Users').doc(user.uid).set(user);
    if (firebaseAuth.currentUser?.emailVerified) {
      res.status(201).send(user);
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    let authError = error as auth.AuthError;
    res.status(400).send(authError.message);
  }
}
