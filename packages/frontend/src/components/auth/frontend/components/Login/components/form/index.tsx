
'use client';

// React + Next
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';

/// -- Components --
import { InputField, SubmitButton } from "../../../shared";

/// -- Functions and objects --
import AuthController from "../../../../../backend/controllers";
import { useVerifyTokenWithJWT } from "@hooks/useVerifyToken";
import Cookies from "@utils/cookies";
import Dates from "@utils/dates";

/// -- Shared --
import { clientRoute } from "@shared/utils/routes";
import { LoginRequestProps, LoginResponseProps } from "@shared/interfaces";

/** Returns the form of the log-in page. */
const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  const resetPassword = () => {
    setPassword(password);
  }

  /** Handles the log-in process. */
  const logIn = async (): Promise<LoginResponseProps> => {
    const data: LoginRequestProps = {
      email: email,
      password: password
    }

    return await AuthController.login(data);
  }

  /**
   * Handles the form submission, including the account
   * credentials check, alerting on error and redirections.
   */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsProcessing(true);

    const { success: loginSuccess, message, jwt } = await logIn();

    if (!loginSuccess) {
      setIsProcessing(false);
      resetPassword();
      return alert(message);
    }

    const { success, payload } = await useVerifyTokenWithJWT(jwt!);

    if (!success) {
      setIsProcessing(false);
      resetPassword();
      return router.push(clientRoute.auth.login.use())
    }

    Cookies.set({ key: "id", data: jwt!, maxAge: Dates.expiresToMaxAge(payload!.exp! * 1000) });

    setIsProcessing(false);
    return router.push(clientRoute.app.use());
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
