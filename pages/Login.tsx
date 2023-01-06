import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import styles from '../styles/Home.module.css';
import { useAuth } from '../utility/hooks';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Login() {
  const auth = useAuth();
  return (
    // This corresponds to the container class in the /styles folder
    <div className={styles.container}>
      <div>
        <span>With that DEFAULT Theme:</span>
      </div>
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />

      <br></br>
      <Button variant="contained" onClick={() => auth.doGoogleLogin()}>
        Mullo World.
      </Button>
    </div>
  );
}
