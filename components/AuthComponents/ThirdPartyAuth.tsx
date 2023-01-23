import { useAuth } from "../../utility/hooks/authentication";

export default function ThirdPartyAuth() {
    const {doGoogleLogin, doFacebookLogin} = useAuth();
    return (
        // <Image src='/google_normal.svg' alt='Google' layout='fill' />
        <div style={$wrapper}>
            <img src='/google_normal.png' alt='sign in with google' style={$google}/>
            <img src='/facebook_login.png' alt='sign in with facebook' style={$facebook} />
        </div>
    )
}

const $wrapper: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const $google: React.CSSProperties = {
    width:'40%',
    height:'40%',
    margin: 5
  }

  const $facebook: React.CSSProperties = {
    width:'44%',
    height:'44%'
  }