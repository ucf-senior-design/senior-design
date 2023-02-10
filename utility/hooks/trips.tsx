import React from 'react';
import { createFetchRequestOptions } from '../fetch';

interface Response {
    result?: any;
    isSuccess: boolean;
    errorMessage?: string;
  }  

interface Trip {
  attendees: Array<string>;
  lastUpdated: Date;
}

interface TripsContext {
    getTrips: (
        callback: (response: Response) => void
      ) => Promise<void>;
    createTrip: (
      trip: Trip, 
      callback: (response: Response) => void
    ) => Promise<void>;
    deleteTrip: (
      tripID: string,
      callback: ( response: Response) => void
    ) => Promise<void>;
}

const TripsContext = React.createContext<TripsContext>({} as TripsContext);

export function useTrips(): TripsContext {
    const context = React.useContext(TripsContext);
  
    if (!context) {
      throw Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export function TripsProvider({ children }: { children: React.ReactNode }) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return (
        <TripsContext.Provider
          value={{
            getTrips,
            createTrip,
            deleteTrip,
          }}
        >
    {children}
    </TripsContext.Provider>)

  async function getTrips(
    callback: (response: Response) => void
    ) {
      const options = createFetchRequestOptions(null, 'GET');
      const response = await fetch(`${API_URL}trip`, options);
 
      if (response.ok) {
        callback({result: await response.text() , isSuccess: response.ok });
      } else {
        callback({ isSuccess: response.ok, errorMessage: await response.text() });
      }
    }
    
    async function createTrip(
      trip: Trip,
      callback: (response: Response) => void
    ) {
      const options = createFetchRequestOptions(JSON.stringify(trip), 'POST');
      const response = await fetch(`${API_URL}/trip`, options);
  
      if (response.ok) {
        callback({ isSuccess: response.ok });
      } else {
        callback({ isSuccess: response.ok, errorMessage: await response.text() });
      }
    }

    async function deleteTrip(
      tripID: string,
      callback: (response: Response) => void
    )
    {
      const options = createFetchRequestOptions(tripID, 'DELETE');
      const response = await fetch(`${API_URL}/trip`, options);
  
      if (response.ok) {
        callback({ isSuccess: response.ok });
      } else {
        callback({ isSuccess: response.ok, errorMessage: await response.text() });
      }
    }
}





