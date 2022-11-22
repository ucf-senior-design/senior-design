import handler from '../../../../pages/api/auth/register';
import { testHandler } from '../../../../__mocks__/fetch';
import { mockFirebaseRegistration } from '../../../../__mocks__/firebase';

describe('Test Register Endpoints', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('[Status 200]: Succesful Register', async () => {
    mockFirebaseRegistration(true);
    const res = await testHandler(handler, {
      body: mockFirebaseRegistration,
    });
    expect(res.statusCode).toBe(200);
  });

  test('[Status 400] : Occur occurs with creating account', async () => {
    mockFirebaseRegistration(false);
    const res = await testHandler(handler, {
      body: mockFirebaseRegistration,
    });
    expect(res.statusCode).toBe(400);
  });
});
