import { stat } from 'fs';
import React from 'react';

type RedirectToast = 'login' | 'details' | undefined;
interface ScreenContext {
  loading: boolean;
  updateLoading: (status: boolean) => void;
  updateRedirectToast: (status: RedirectToast) => void;
  redirectToast: RedirectToast;
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
  const [redirectToast, setRedirectToast] = React.useState<RedirectToast>();

  function updateLoading(status: boolean) {
    setLoading(status);
  }

  function updateRedirectToast(status: RedirectToast) {
    setRedirectToast(status);
  }

  return (
    <ScreenContext.Provider
      value={{ loading, updateLoading, updateRedirectToast, redirectToast }}
    >
      {children}
    </ScreenContext.Provider>
  );
}
