
'use client';

// React + Next
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { InputField, SubmitButton } from "../../../shared";
import { loginController, newCookie } from '@components/auth/backend/controllers';
import { useVerifyTokenWithJWT } from '@hooks/useVerifyToken';
import { clientRoute } from '@shared/classes/routes';
import { AuthResponseProps, LoginProps } from '@shared/interfaces';
import Cookies from '@utils/cookies';
import Dates from '@utils/dates';

/** Returns the form of the log-in page. */
const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  /** Handles the log-in process. */
  const logIn = async (): Promise<AuthResponseProps> => {
    const data: LoginProps = {
      email: email,
      password: password
    }

    const response: AuthResponseProps = await loginController(data);

    return response;
  }


  /** Handles the form submission, including the account credentials check, alerting on error and redirections. */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsProcessing(true);

    const authResponse: AuthResponseProps = await logIn();

    if (!authResponse.success) {
      setPassword("");
      setIsProcessing(false);
      return alert(authResponse.message);
    }

    const { success, result: tokenResponse } = await useVerifyTokenWithJWT(authResponse.jwt!);

    if (!success) {
      setPassword("");
      setIsProcessing(false);
      router.push(clientRoute.auth.login.use())
    }

    Cookies.set({ key: "id", data: authResponse.jwt!, maxAge: Dates.expiresToMaxAge(tokenResponse.payload!.exp! * 1000) });

    setIsProcessing(false);
    router.push(clientRoute.app.use());
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <InputField
        type="email"
        label="Email"
        placeholder="Entre ton email ici..."
        name="email"
        value={email}
        onChange={setEmail}
      />
      <InputField
        type="password"
        label="Mot de passe"
        placeholder="Entre ton mot de passe ici..."
        name="password"
        value={password}
        onChange={setPassword}
      />
      <SubmitButton isProcessing={isProcessing} label="Connexion" />
    </form>
  )
}

export default LoginForm;
