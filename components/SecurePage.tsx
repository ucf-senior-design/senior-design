import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../utility/hooks/authentication';
import { useScreen } from '../utility/hooks/screen';

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
  const { updateRedirectToast } = useScreen();
  React.useEffect(() => {
    if (user === undefined) {
      updateRedirectToast('login');
      router.push('/auth/login');
      return;
    }
    if (!user.didFinishRegister) {
      updateRedirectToast('details');
      router.push('auth/details');
      return;
    }
    // Only allow content to be returned if user is logged in.
    setContent(children);
  }, []);

  return <>{content}</>;
}
