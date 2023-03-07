import { IconButton } from "@mui/material"
import Image from "next/image"
import { useAuth } from "../../utility/hooks/authentication"

export default function ThirdPartyAuth() {
  const { doGoogleLogin, doFacebookLogin } = useAuth()
  return (
    <div style={$wrapper}>
      <IconButton onClick={doGoogleLogin}>
        <Image src="/google.png" alt="google authentication" width={40} height={40} />
      </IconButton>
      <IconButton onClick={doFacebookLogin}>
        <Image src="/facebook.png" alt="facebook authentication" width={40} height={40} />
      </IconButton>
    </div>
  )
}

const $wrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
}
