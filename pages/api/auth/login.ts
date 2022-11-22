import auth from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFetch } from '../../../utility/fetch';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { User } from '../../../utility/types/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | User>
) {
  const { result, errorMessage, errorCode } = await handleFetch<{
    localId: string;
  }>(
    'POST',
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    ${process.env.REACT_APP_FIREBASE_API_KEY}`,
    'Firebase/Auth',
    JSON.stringify({
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true,
    })
  );

  if (errorMessage.length > 0) {
    res.status(errorCode).send(errorMessage);
    return;
  } else {
    try {
      if (
        (await firebaseAdmin.auth().getUser(result.localId)).emailVerified ===
          false &&
        process.env.NODE_ENV !== 'test'
      ) {
        res.status(400).send('Please verify your email.');
      } else {
        res
          .status(200)
          .send(
            (
              await firebaseAdmin
                .firestore()
                .collection('Users')
                .where('uid', '==', result.localId)
                .get()
            ).docs[0].data() as any as User
          );
      }
    } catch (error) {
      let authError = error as auth.AuthError;
      res.status(400).send(authError.message);
    }
  }
}
