import auth, {
  AuthErrorCodes,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithCredential,
} from 'firebase/auth';
import type { NextApiResponse } from 'next';
import firebaseAdmin from '../../../utility/firebaseAdmin';
import { getAuthentication } from '../../../utility/firebaseApp';
import { ProviderLoginRequest, User } from '../../../utility/types/user';

export default async function handler(
  req: ProviderLoginRequest,
  res: NextApiResponse
) {
  switch (req.body.provider) {
    case 'google':
      doLogin(GoogleAuthProvider.credential(req.body.idToken));
      break;
    default:
      res.status(400).send('Cannot login at this time');
  }

  async function doLogin(credential: OAuthCredential) {
    await signInWithCredential(getAuthentication(), credential)
      .then(async (result) => {
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
            name: result.user.displayName,
            photo: result.user.photoURL,
          });
          return;
        }

        const user = maybeUser.data() as any as User;
        res.status(200).send(user);
      })
      .catch((error: auth.AuthError) => {
        switch (error.code) {
          case AuthErrorCodes.INVALID_EMAIL:
            res.status(400).send('Invalid email.');
            break;
          case AuthErrorCodes.INVALID_PASSWORD:
            res.status(400).send('Invalid Password.');
            break;
          default:
            console.log(error.code);
            res.status(400).send('Try again later.');
        }
      });
  }
}
