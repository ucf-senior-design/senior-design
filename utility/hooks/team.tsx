import React from 'react';

interface Response {
    result?: any;
    isSuccess: boolean;
    errorMessage?: string;
}  

interface Team {
  members: Array<string>;
}

interface TeamContext {

}

const TeamContext = React.createContext<TeamContext>({} as TeamContext);

export function useTrips(): TeamContext {
    const context = React.useContext(TeamContext);
  
    if (!context) {
      throw Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export function TeamProvider({ children }: { children: React.ReactNode }) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return (
        <TeamContext.Provider
          value={{
          }}
        >
    {children}
    </TeamContext.Provider>)

}





