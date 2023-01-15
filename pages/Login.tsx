import { LoginForm } from "../components/LoginComponents/LoginForm"

const label = { inputProps: { "aria-label": "Switch demo" } }

export default function Login() {
  return (
    // This corresponds to the container class in the /styles folder
    <div>
      <LoginForm />
    </div>
  )
}
