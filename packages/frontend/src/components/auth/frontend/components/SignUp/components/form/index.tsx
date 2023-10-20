
'use client';

// React + Next
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

// Internal
import styles from './index.module.scss';

/// -- Components --
import { InputField, SubmitButton, Button } from "../../../shared";

/// -- Functions and objects --
import { signUpController } from "../../../../../backend/controllers";
import { useVerifyTokenWithJWT } from "@hooks/useVerifyToken";
import Cookies from "@utils/cookies";
import Dates from "@utils/dates";

/// -- Shared --
import { clientRoute } from "@shared/utils/routes";
import { SignUpRequestProps, SignUpResponseProps } from "@shared/interfaces";

/** Returns the form of the sign-up page. */
const SignUpForm = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isStepTwo, setIsStepTwo] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const router = useRouter();

  /** Resets the passwords. */
  const resetPasswords = () => {
    setPassword("");
    setConfirmPassword("");
  };

  /** Handles the signup process and return the response. */
  const signUp = async (): Promise<SignUpResponseProps> => {
    const data: SignUpRequestProps = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    return await signUpController(data);
  }

  /** Handles the form submission, including the account creation, alerting on error and redirections. */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsProcessing(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setIsProcessing(false);
      resetPasswords();
      return;
    }
    
    const { success: signUpSuccess, message, jwt } = await signUp();

    if (!signUpSuccess) {
      alert(message);
      setIsProcessing(false);
      resetPasswords();
      return;
    }

    const { success, payload } = await useVerifyTokenWithJWT(jwt!);

    if (!success) {
      router.push(clientRoute.auth.login.use());
    }
    
    Cookies.set({ key: "id", data: jwt!, maxAge: Dates.expiresToMaxAge(payload!.exp! * 1000) });

    router.push(clientRoute.app.use());
    return setIsProcessing(false);
  }
  
  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={`${styles.fields} ${isStepTwo ? styles.active : ''}`}>
        <div className={styles.innerFields}>
          <InputField
            type="text"
            label="Prénom"
            placeholder="Entre ton prénom ici..."
            name="firstName"
            value={firstName}
            onChange={setFirstName}
          />
          <InputField
            type="text"
            label="Nom de famille"
            placeholder="Entre ton nom de famille ici..."
            name="lastName"
            value={lastName}
            onChange={setLastName}
          />
        </div>
        <div className={styles.innerFields}>
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
          <InputField
            type="password"
            label="Confirmer le mot de passe"
            placeholder="Entre ton mot de passe ici..."
            name="confirmPassword"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </div>
      </div>
      <div className={styles.buttons}>
        { !isStepTwo && <Button label="Continuer" onClick={() => setIsStepTwo(true)} /> }
        { isStepTwo && (
          <>
            <Button backgroundColor="grey" label="Retour" onClick={() => setIsStepTwo(false)} />
            <SubmitButton label="Créer mon compte" isProcessing={isProcessing} />
          </>
        )}
      </div>
    </form>
  )
}

export default SignUpForm;
