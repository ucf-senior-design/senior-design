import Router from 'next/router';
import React from 'react';
import theme from '../styles/theme/Theme';
import { useAuth } from '../utility/hooks/authentication';
import { DashboardProvider } from '../utility/hooks/dashboard';

export default function Page({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const [page, setPage] = React.useState(<> {children} </>);
  const backgroundImage =
    path === '/about' ? "url('/Mountains.svg') 80% 80% " : undefined;
  const { user } = useAuth();
  const authenticatedPages = ['/dashboard'];
  // React.useEffect(() => {
  //   authenticatedPages.forEach((value) => {
  //     if (
  //       path.length >= value.length &&
  //       path.substring(0, value.length) === value
  //     ) {
  //       if (user === undefined) {
  //         console.log('need to login first');
  //         Router.push('/auth/login');
  //       } else if (!user.didFinishRegister) {
  //         console.log('need to add details first');
  //         Router.push('auth/details');
  //       }
  //     }

  //     setPage();
  //   });
  // }, [user]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        padding: 10,
        backgroundColor: theme.palette.background.default,
        background: backgroundImage,
      }}
    >
      <DashboardProvider> {children}</DashboardProvider>
    </div>
  );
}
