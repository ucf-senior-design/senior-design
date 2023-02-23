import { stat } from 'fs';
import React from 'react';

interface ScreenContext {
  loading: boolean;
  updateLoading: (status: boolean) => void;
  updateErrorToast: (status: string | undefined) => void;
  errorToast: string | undefined;
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
  const [errorToast, setErrorToast] = React.useState<string | undefined>();

  function updateLoading(status: boolean) {
    setLoading(status);
  }

  function updateErrorToast(status: string | undefined) {
    setErrorToast(status);
  }

  return (
    <ScreenContext.Provider
      value={{ loading, updateLoading, updateErrorToast, errorToast }}
    >
      {children}
    </ScreenContext.Provider>
  );
}
