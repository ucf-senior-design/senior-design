import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import styles from '../styles/Home.module.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Login() {
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
      <Button variant="contained">Mullo World.</Button>
    </div>
  );
}
