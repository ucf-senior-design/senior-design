import { UserRecord } from "firebase-admin/lib/auth/user-record"
import firebaseAdmin from "../utility/firebaseAdmin"
import { UserRegistration } from "../utility/types/user"

export const mockRegistrationPayload = {
  email: "email@email.com",
  password: "password",
} as any as UserRegistration

export function mockFirebaseRegistration(succesful: boolean) {
  const authUser = jest
    .spyOn(firebaseAdmin.auth(), "createUser")
    .mockReturnValue(
      succesful
        ? (Promise.resolve({ uid: "uid" }) as Promise<UserRecord>)
        : Promise.resolve(undefined as any as Promise<UserRecord>),
    )

  const set = jest.fn()
  const doc = jest.fn(() => ({ set }))
  const firestoreUser = jest
    .spyOn(firebaseAdmin.firestore(), "collection")
    .mockReturnValue({ doc } as unknown as any)
}
