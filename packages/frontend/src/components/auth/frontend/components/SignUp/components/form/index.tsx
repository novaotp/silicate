
'use client';

// React + Next
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

// Internal
import styles from './index.module.scss';
import { InputField, SubmitButton } from "../../../shared";
import { useVerifyTokenWithJWT } from "@hooks/useVerifyToken";
import { clientRoute } from "@shared/classes/routes";
import { AuthResponseProps, SignUpProps } from "@shared/interfaces";
import Cookies from "@classes/cookies";
import { signUpController } from "../../../../../backend/controllers";
import Dates from "@classes/dates";

/** Returns the form of the sign-up page. */
const SignUpForm = (): JSX.Element => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isStepTwo, setIsStepTwo] = useState<boolean>(false);
  const router = useRouter();

  /** Handles the signup process. */
  const signUp = async () => {
    const data: SignUpProps = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    const response: AuthResponseProps = await signUpController(data);

    return response;
  }

  /** Handles the form submission, including the account creation, alerting on error and redirections. */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return alert("Passwords do not match");
    }
    
    const authResponse: AuthResponseProps = await signUp();

    if (!authResponse.success) {
      setPassword("");
      setConfirmPassword("");
      return alert(authResponse.message);
    }

    const { success, result: tokenResponse } = await useVerifyTokenWithJWT(authResponse.jwt!);

    if (!success) {
      router.push(clientRoute.auth.login.use());
    }
    
    Cookies.set({ key: "id", data: authResponse.jwt!, maxAge: Dates.expiresToMaxAge(tokenResponse.payload!.exp! * 1000) });

    router.push(clientRoute.app.use());
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
      {!isStepTwo && (
          <SubmitButton
            label="Continuer"
            type='button'
            onClick={() => {
              if (!isStepTwo) {
                setIsStepTwo(true);
              }
            }}
          />
        )}
        {isStepTwo && (
          <SubmitButton
            backgroundColor="grey"
            label="Retour"
            type="button"
            onClick={() => {
              setIsStepTwo(false);
            }}
          />
        )}
        {isStepTwo && (
          <SubmitButton
            label="Créer mon compte"
            type='submit'
          />
        )}
      </div>
    </form>
  )
}

export default SignUpForm;
