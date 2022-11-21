import handler from '../../../../pages/api/auth/register';
import firebaseAdmin from '../../../../utility/firebaseAdmin';
import { User, UserRegistration } from '../../../../utility/types/user';
import { testHandler } from '../../../../__mocks__/fetch';

describe('Test Register Endpoints', () => {
  test('[Status 200]: Succesful Register', async () => {
    try {
      const user = firebaseAdmin.auth().getUserByEmail('rTest@rTest.com');
      firebaseAdmin.auth().deleteUser((await user).uid);
    } catch (e) {}

    const registerPaylod: UserRegistration = {
      email: 'rTest@rTest.com',
      password: 'password',
      medicalInfo: ['AVOID_CROWDS', 'AVOID_LOUD_NOISES'],
      allergies: ['Peanuts'],
      userName: 'testR',
      name: 'Test',
      profilePic: 'https://pictureLink.com',
    };
    const res = await testHandler(handler, {
      body: registerPaylod,
    });
    const json = res._getData() as any as User;

    expect(res.statusCode).toBe(200);
    expect(json.uid).toBeDefined();
    await firebaseAdmin.auth().deleteUser(json.uid);
    (
      await firebaseAdmin
        .firestore()
        .collection('Users')
        .where('uid', '==', json.uid)
        .get()
    ).docs[0].ref.delete();
  });

  test('[Status 400] : Attempt to Create Account with existing email', async () => {
    const registerPaylod: UserRegistration = {
      email: process.env.REACT_APP_VALID_USER_EMAIL ?? '',
      password: 'password',
      medicalInfo: ['AVOID_CROWDS', 'AVOID_LOUD_NOISES'],
      allergies: ['Peanuts'],
      userName: 'testR',
      name: 'Test',
      profilePic: 'https://pictureLink.com',
    };

    const res = await testHandler(handler, {
      body: registerPaylod,
    });
    expect(res.statusCode).toBe(400);
  });
});
