/*
update email
update preferences/medical info/profile picture/allergies
update emergency contact info 
*/
import { createFetchRequestOptions } from "../fetch"
import { Response } from "../types/helper"
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default async function updateUser(
  user: {
    medicalInfo: Array<string>
    name: string
    allergies: Array<string>
  },
  callback: (response: Response) => void,
) {
  const options = createFetchRequestOptions(JSON.stringify(user), "PUT")
  const response = await fetch(`${API_URL}auth/user`, options)

  if (response.ok) {
    callback({ result: await response.text(), isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}
