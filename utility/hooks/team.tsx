import { createFetchRequestOptions } from '../fetch';

interface Response {
    result?: any;
    isSuccess: boolean;
    errorMessage?: string;
}  

interface Team {
  members: Array<string>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function isValidTeam(team: Team) {
  return true;
}

export const createTeam = async ( team: Team, callback: (response: Response) => void ) => {
  const options = createFetchRequestOptions(JSON.stringify(team), 'POST');
  if (isValidTeam(team)) {
    const response = await fetch(`${API_URL}team`, options);
    if (response.ok) {
      callback({ isSuccess: response.ok });
  
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() });
    }
  } else {
    callback({ isSuccess: false, errorMessage: "Team is not valid."})
  }
}

export const deleteTeam = async ( teamID: string, callback: (response: Response) => void ) => {
  const options = createFetchRequestOptions(JSON.stringify(teamID), 'DELETE');
  const response = await fetch(`${API_URL}team`, options);

  if (response.ok) {
    callback({ isSuccess: response.ok });

  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() });
  }
}

export const getMembers = async (teamID: string, callback: (response: Response) => void) => {
  // const options = createFetchRequestOptions(null, 'GET'); // TODO: update for this is in dashboard branch
  // const response = await fetch(`${API_URL}team/${teamID}`, options);

  // if (response.ok) {
  //   callback({ result: await response.text(), isSuccess: response.ok });
  // } else {
  //   callback({ isSuccess: response.ok, errorMessage: await response.text() });
  // }
}

export const updateTeam = async (teamID: string, userID: string, purpose: string, callback: (response: Response) => void) => {
  // const options = createFetchRequestOptions(JSON.stringify(userID), 'PUT'); // TODO: update axios to support put endpoints
  // const response = await fetch(`${API_URL}team/${teamID}`, options);

  // if (response.ok) {
  //   callback({ isSuccess: response.ok });

  // } else {
  //   callback({ isSuccess: response.ok, errorMessage: await response.text() });
  // }
}

export const getTeams = async (userID: string, callback: (reponse: Response) => void) => {
  // const options = createFetchRequestOptions(null, 'GET'); // TODO: update for this is in dashboard branch
  // const response = await fetch(`${API_URL}team/${userID}`, options);

  // if (response.ok) {
  //   callback({ result: await response.text(), isSuccess: response.ok });
  // } else {
  //   callback({ isSuccess: response.ok, errorMessage: await response.text() });
  // }
}