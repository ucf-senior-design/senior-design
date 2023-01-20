import { LoginForm } from '../components/AuthComponents/LoginComponents/LoginForm';

export default function Login() {
  return (
    <div style={$wrapper}>
      <LoginForm />
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
