import { SendEmail } from "../../components/AuthComponents/RegisterComponents/SendEmail"

export default function PasswordUpdate() {
  return (
    <div style={$wrapper}>
      <SendEmail purpose="passwordReset" />
    </div>
  )
}

const $wrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
