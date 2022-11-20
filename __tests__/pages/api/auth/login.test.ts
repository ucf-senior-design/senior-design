import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../../../pages/api/auth/login';

test('succesfully registers user', () => {
  const req = {
    body: JSON.stringify({
      email: 'testEmail@domain.com',
      password: 'password',
    }),
  } as any as NextApiRequest;

  const res = {
    status: () => ({
      json: () => {},
    }),
  } as any as NextApiResponse;

  handler(req, res);
  const json = jest.fn();
  console.log(json);
});
