
// Internal
import { clientRoute } from '@shared/classes/routes';
import styles from './index.module.scss';
import { SignUpForm, WelcomeHeader } from './components';
import { AlternativeLink } from '../shared';

/** Returns the main component for the sign-up page. */
const SignUp = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <WelcomeHeader />
      </div>
      <div className={styles.form}>
        <SignUpForm />
        <AlternativeLink
          text="T'as déjà un compte ?"
          href={clientRoute.auth.login.use()}
          label='Connecte-toi'
        />
      </div>
    </div>
  )
}

export default SignUp;
