import handler from '../../../../pages/api/auth/login';
import firebaseAdmin from '../../../../utility/firebaseAdmin';
import { testHandler } from '../../../../__mocks__/fetch';

describe('Test Login Endpoints', () => {
  test('[Status 400]: Incorrect Credentials', async () => {
    const res = await testHandler(handler, {
      body: {
        email: process.env.REACT_APP_VALID_USER_EMAIL,
        password: '',
      },
    });
    expect(res.statusCode).toBe(400);
  });

  test('[Status 200]: Succesful Login', async () => {
    const res = await testHandler(handler, {
      body: {
        email: process.env.REACT_APP_VALID_USER_EMAIL,
        password:  process.env.REACT_APP_PASSWORD,
      },
    });

    expect(res.statusCode).toBe(200);
  });

  test('[Status 400] : Email Not Verified', async () => {
    const env = process.env;
    process.env = {
      ...env,
      NODE_ENV: 'production',
    };
    const res = await testHandler(handler, {
      body: {
        email: process.env.REACT_APP_VALID_USER_EMAIL,
        password: process.env.REACT_APP_PASSWORD,
      },
    });

    expect(res.statusCode).toBe(400);
    process.env = env;
  });

  test('[Status 400] : Cannot get user from firestore because it does not exist.', async () => {
    const res = await testHandler(handler, {
      body: {
        email: process.env.REACT_APP_INVALID_USER_EMAIL,
        password: process.env.REACT_APP_PASSWORD,
      },
    });

    expect(res.statusCode).toBe(400);
  });
});
