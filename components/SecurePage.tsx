import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../utility/hooks/authentication';

/**
 * Helps ensures that users are logged in when visiting pages that require authentication
 */
export default function SecurePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = React.useState<React.ReactNode>(<></>);
  const { user } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (user === undefined) {
      router.push('/auth/login');
      return;
    }
    if (!user.didFinishRegister) {
      router.push('auth/details');
      return;
    }
    // Only allow content to be returned if user is logged in.
    setContent(children);
  }, []);

  return <>{content}</>;
}
