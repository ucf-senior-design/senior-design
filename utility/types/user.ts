type Override<T1, T2> = Omit<T1, keyof T2> & T2;

import { NextApiRequest } from 'next';

export type MedicalInfoField =
  | 'AVOID_CROWDS'
  | 'AVOID_LOUD_NOISES'
  | 'AVOID_FLASHING'
  | 'AVOID_UNSTABLE_TERRAIN'
  | 'AVOID_EXTENDED_ACTIVITY';

export interface User {
  uid: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  medicalInfo: Array<MedicalInfoField>;
  allergies: Array<string>;
}
// Object.entries(enums).forEach(([key, value]) =>
//   enumArray.push({ number: key, word: value })
// );
export type valueType = 'stringValue' | 'booleanValue';

export type UserField =
  | 'uid'
  | ' profilePicture'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'medicalInfo'
  | 'allergies';

interface UserRegistration extends Omit<User, 'uid'> {
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export type RegistrationRequest = Override<
  NextApiRequest,
  { body: UserRegistration }
>;

export type LoginRequest = Override<NextApiRequest, { body: UserLogin }>;
