import GoogleButton from "react-google-button";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useAuth } from "../../utility/hooks/authentication";

export default function ThirdPartyAuth() {
    const {doGoogleLogin, doFacebookLogin} = useAuth();
    return (
        // <Image src='/google_normal.svg' alt='Google' layout='fill' />
                    // <img src='/google_normal.png' alt='sign in with google' style={$google}/>
            // <img src='/facebook_login.png' alt='sign in with facebook' style={$facebook} />
            //          <GoogleLoginButton style={$google} onClick={() => doGoogleLogin}/>
        <div style={$wrapper}>
          <GoogleButton onClick={() => {doGoogleLogin}} />
          <FacebookLoginButton style={$facebook} onClick={() => {doFacebookLogin}}/>
        </div>
    )
}

const $wrapper: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  };

  const $google: React.CSSProperties = {
    textTransform:'lowercase',
    fontSize:17,
    // border: '1px solid rgba(0, 0, 0, 0.5)',
    boxShadow:'none',
    width:'45%'
  }

  const $facebook: React.CSSProperties = {
    //width:'55%',
    //maxHeight:'70%',
    //height:'75%',
    fontSize:17,
    padding:10,
    width:'55%',
    textTransform:'lowercase',
    boxShadow:'none'
  }