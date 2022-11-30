import auth from 'firebase/auth';
import type { NextApiResponse } from 'next';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { RegistrationRequest, User } from '../../../utility/types/user';

export default async function handler(
  req: RegistrationRequest,
  res: NextApiResponse<User | string>
) {
  await firebaseAdmin
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
    })
    .catch((error: auth.AuthError) => {
      res.status(400).send(error.message);
    })
    .then(async (authUser: { uid: string } | void) => {
      if (authUser && authUser.uid) {
        const user: User = {
          uid: authUser.uid,
          email: req.body.email,
          profilePic: req.body.profilePic,
          name: req.body.name,
          userName: req.body.userName,
          medicalInfo: req.body.medicalInfo,
          allergies: req.body.allergies,
        };

        try {
          await firebaseAdmin
            .firestore()
            .collection('Users')
            .doc(user.uid)
            .set(user);

          res.status(200).send(user);
        } catch (error) {
          let authError = error as auth.AuthError;
          res.status(400).send(authError.message);
        }
      } else {
        res.status(400).send('Try again Later.');
      }
    });
}
