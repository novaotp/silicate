
import { AlternativeLink } from '../shared';
import styles from './index.module.scss';
import { clientRoute } from '@shared/utils/routes';
import { LoginForm, LoginWelcomeHeader } from './components';

/** Returns the main component for the log-in page. */
const Login = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcomeWrapper}>
        <LoginWelcomeHeader />
      </div>
      <div className={styles.formWrapper}>
        <LoginForm />
        <AlternativeLink
          text="Mot de passe oublié ?"
          href='/auth/reset-password'
          label='Change-le'
        />
        <AlternativeLink
          text="Pas encore de compte ?"
          href={clientRoute.auth.signup.use()}
          label='Crées-en un'
        />
      </div>
    </div>
  )
}

export default Login;
