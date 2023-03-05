type Override<T1, T2> = Omit<T1, keyof T2> & T2

import { NextApiRequest } from "next"

export type MedicalInfoField =
  | "AVOID_CROWDS"
  | "AVOID_LOUD_NOISES"
  | "AVOID_FLASHING"
  | "AVOID_UNSTABLE_TERRAIN"
  | "AVOID_EXTENDED_ACTIVITY"

export interface User {
  uid: string
  email: string
  name: string
  profilePic: string
  username: string
  medicalInfo: Array<string>
  allergies: Array<string>
}

export type valueType = "stringValue" | "booleanValue"

export type UserField =
  | "uid"
  | " profilePicture"
  | "firstName"
  | "lastName"
  | "email"
  | "medicalInfo"
  | "allergies"

export interface UserRegistration extends User {
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export type RegistrationRequest = Override<NextApiRequest, { body: UserRegistration }>

export type ProviderLoginRequest = Override<
  NextApiRequest,
  {
    body: {
      provider: "google" | "twitter" | "facebook"
      idToken: string
    }
  }
>

export type LoginRequest = Override<NextApiRequest, { body: UserLogin }>

export type Friendship = {
  uid: string
  pairing: Array<string>
  status: {
    state: "accepted" | "pending"
    modifier: string
  }
  friend: {
    name: string | undefined
    photoURL: string | undefined
  }
}
