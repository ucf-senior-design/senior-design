import GoogleButton from 'react-google-button';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { useAuth } from '../../utility/hooks/authentication';

export default function ThirdPartyAuth() {
  const { doGoogleLogin, doFacebookLogin } = useAuth();
  return (
    <div style={$wrapper}>
      <GoogleButton
        onClick={() => {
          doGoogleLogin();
        }}
      />
      <FacebookLoginButton
        style={$facebook}
        onClick={() => {
          doFacebookLogin();
        }}
      />
    </div>
  );
}

const $wrapper: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
};

const $facebook: React.CSSProperties = {
  fontSize: 17,
  padding: 10,
  width: '55%',
  textTransform: 'lowercase',
  boxShadow: 'none',
};
