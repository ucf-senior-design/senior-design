import React from 'react';

interface ScreenContext {
  loading: boolean;
  toggleLoading: () => void;
}
const ScreenContext = React.createContext<ScreenContext>({} as ScreenContext);

export function useScreen(): ScreenContext {
  const context = React.useContext(ScreenContext);

  if (!context) {
    throw Error('useScreen must be used within ScreenProvider');
  }
  return context;
}

export function ScreenProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState<boolean>(false);
 
  
  function toggleLoading() {
    setLoading(!loading);
  }



  return (
    <ScreenContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </ScreenContext.Provider>
  );
}
