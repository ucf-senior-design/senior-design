import { stat } from 'fs';
import React from 'react';

interface ScreenContext {
  loading: boolean;
  errorToast: string | undefined;
  autoPadding: boolean;
  updateLoading: (status: boolean) => void;
  updateErrorToast: (status: string | undefined) => void;
  updateAutoPadding: (status: boolean) => void;
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
  const [autoPadding, setAutoPadding] = React.useState(true);

  function updateLoading(status: boolean) {
    setLoading(status);
  }

  function updateErrorToast(status: string | undefined) {
    setErrorToast(status);
  }

  function updateAutoPadding(status: boolean) {
    setAutoPadding(status);
  }

  return (
    <ScreenContext.Provider
      value={{
        loading,
        updateLoading,
        updateErrorToast,
        errorToast,
        updateAutoPadding,
        autoPadding,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
}
