import { useState } from 'react';
import { useAuth } from '../../utility/hooks/authentication';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const { sendPasswordReset } = useAuth();
  return (
    <div style={$wrapper}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <button
        onClick={() =>
          sendPasswordReset(email, (response) => {
            if (response.isSuccess) {
              alert('email sent succesfully.');
            }
          })
        }
      >
        send email
      </button>
    </div>
  );
}

const $wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
