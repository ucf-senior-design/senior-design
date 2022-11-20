import auth from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createFetchOptions, doFetch } from '../../../utility/fetch';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { LoginRequest, User } from '../../../utility/types/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | User>
) {
  const authUser = await doFetch<auth.UserInfo>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
    ${process.env.REACT_APP_FIREBASE_API_KEY}`,
    res,
    createFetchOptions(
      'POST',
      JSON.stringify({
        email: req.body.email,
        password: req.body.password,
        returnSecureToken: true,
      })
    )
  );

  try {
    if (res.headersSent) {
      return;
    } else if (
      (await firebaseAdmin.auth().getUser(authUser.uid)).emailVerified === false
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
              .where('uid', '==', authUser.uid)
              .get()
          ).docs[0].data() as any as User
        );
    }
  } catch (error) {
    let authError = error as auth.AuthError;
    res.status(400).send(authError.message);
  }
}
