import { IconButton } from '@mui/material';
import { useAuth } from '../../utility/hooks/authentication';

export default function ThirdPartyAuth() {
  const { doGoogleLogin, doFacebookLogin } = useAuth();
  return (
    <div style={$wrapper}>
      <IconButton onClick={doGoogleLogin}>
        <img src="/google.png" alt="google authentication" style={$iconstyle} />
      </IconButton>
      <IconButton onClick={doFacebookLogin}>
        <img
          src="/facebook.png"
          alt="facebook authentication"
          style={$iconstyle}
        />
      </IconButton>
    </div>
  );
}

const $iconstyle: React.CSSProperties = { height: 40, width: 40 };

const $wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
};
