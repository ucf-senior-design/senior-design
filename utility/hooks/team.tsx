import { createFetchRequestOptions } from "../fetch"

interface Response {
  result?: any
  isSuccess: boolean
  errorMessage?: string
}

interface Team {
  members: Array<string>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

function isValidTeam(team: Team) {
  return true
}

export const createTeam = async (team: Team, callback: (response: Response) => void) => {
  const options = createFetchRequestOptions(JSON.stringify(team), "POST")
  if (isValidTeam(team)) {
    const response = await fetch(`${API_URL}teams`, options)
    if (response.ok) {
      callback({ isSuccess: response.ok })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  } else {
    callback({ isSuccess: false, errorMessage: "Team is not valid." })
  }
}

export const deleteTeam = async (teamID: string, callback: (response: Response) => void) => {
  const options = createFetchRequestOptions(null, "DELETE")
  const response = await fetch(`${API_URL}teams/${teamID}`, options)

  if (response.ok) {
    callback({ isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}

export const getMembers = async (teamID: string, callback: (response: Response) => void) => {
  const options = createFetchRequestOptions(null, "GET")
  const response = await fetch(`${API_URL}teams/${teamID}`, options)

  if (response.ok) {
    callback({ result: await response.text(), isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}

export const updateTeam = async (
  teamID: string,
  userID: string,
  purpose: string,
  callback: (response: Response) => void,
) => {
  const options = createFetchRequestOptions(JSON.stringify(userID), "PUT")
  const response = await fetch(`${API_URL}teams/${teamID}/${purpose}`, options)

  if (response.ok) {
    callback({ isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}

export const getTeams = async (userID: string, callback: (reponse: Response) => void) => {
  const options = createFetchRequestOptions(null, "GET")
  const response = await fetch(`${API_URL}teams/user/${userID}`, options)

  if (response.ok) {
    callback({ result: await response.text(), isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}
