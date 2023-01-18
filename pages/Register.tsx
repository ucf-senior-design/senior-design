import { RegisterForm } from '../components/AuthComponents/RegisterComponents/RegisterForm';
import styles from '../styles/Home.module.css';

export default function Register() {
  return (
    // This corresponds to the container class in the /styles folder
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}
