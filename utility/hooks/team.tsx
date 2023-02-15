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

export const deleteTeam = async ( team: Team, callback: (response: Response) => void ) => {
  const options = createFetchRequestOptions(JSON.stringify(team), 'DELETE');
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
