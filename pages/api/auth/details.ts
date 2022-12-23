import auth from 'firebase/auth';
import type { NextApiResponse } from 'next';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { RegistrationRequest, User } from '../../../utility/types/user';

export default async function handler(
  req: RegistrationRequest,
  res: NextApiResponse<User | string>
) {
  const user: User = {
    uid: req.body.uid,
    email: req.body.email,
    profilePic: req.body.profilePic,
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
    res.status(200).send(user);
  } catch (error) {
    let authError = error as auth.AuthError;
    res.status(400).send(authError.message);
  }
}
