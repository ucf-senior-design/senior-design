import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import auth from 'firebase/auth';
import type { NextApiResponse } from 'next';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { RegistrationRequest, User } from '../../../utility/types/user';

export default async function handler(
  req: RegistrationRequest,
  res: NextApiResponse<User | string>
) {
  try {
    await firebaseAdmin
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
        photoURL: req.body.profilePicture,
      })
      .then(async (authUser: UserRecord) => {
        const user: User = {
          uid: authUser.uid,
          ...req.body,
        };

        try {
          await firebaseAdmin
            .firestore()
            .collection('Users')
            .doc(authUser.uid)
            .set(user);

          res.status(200).send(user);
        } catch (error) {
          let authError = error as auth.AuthError;
          res.status(400).send(authError.message);
        }
      });
  } catch (error) {
    let authError = error as auth.AuthError;
    res.status(400).send(authError.message);
  }
}
