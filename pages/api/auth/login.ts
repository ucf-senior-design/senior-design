import auth, {
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAuth } from '../../../utility/firebase';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { User } from '../../../utility/types/user';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  signInWithEmailAndPassword(firebaseAuth, req.body.email, req.body.password)
    .then(async (result) => {
      try {
        const maybeUser = await (
          await firebaseAdmin
            .firestore()
            .collection('Users')
            .where('uid', '==', result.user.uid)
            .get()
        ).docs[0];

        if (maybeUser === undefined) {
          res.status(202).send({
            uid: result.user.uid,
            email: result.user.email,
            photo: result.user.photoURL,
          });
          return;
        }

        if (
          (await firebaseAdmin.auth().getUser(result.user.uid))
            .emailVerified === false &&
          process.env.NODE_ENV !== 'test'
        ) {
          res.status(203).send('Need to Verify Email');
          res.status(200).send(maybeUser.data() as any as User);
        }
      } catch (error) {
        let authError = error as auth.AuthError;
        res.status(400).send(authError.message);
      }
    })
    .catch((error: auth.AuthError) => {
      switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          res.status(400).send('Invalid email.');
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          res.status(400).send('Invalid Password.');
          break;
        case 'auth/user-not-found':
          res.status(400).send('User not found.');
          break;
        default:
          res.status(400).send('Try again later.');
      }
    });
}
