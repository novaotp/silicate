
'use client';

// React + Next
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Internal
import styles from './index.module.scss';
import { InputField, SubmitButton } from "../../../shared";
import { useVerifyTokenWithJWT } from "@hooks/useVerifyToken";
import { clientRoute } from "@shared/classes/routes";
import { AuthResponseProps, SignUpProps } from "@shared/interfaces";
import Cookies from "@classes/cookies";
import { signUpController } from "@components/auth/backend/controllers";

/** Returns the form of the sign-up page. */
const SignUpForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  /** Handles the signup process. */
  const signUp = async () => {
    const formData = new FormData(formRef.current!);

    const data: SignUpProps = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    const response: AuthResponseProps = await signUpController(data);

    return response;
  }

  /** Handles the form submission, including the account creation, alerting on error and redirections. */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const authResponse: AuthResponseProps = await signUp();

    if (!authResponse.success) {
      return alert(authResponse.message);
    }

    const { success, result: tokenResponse } = await useVerifyTokenWithJWT(authResponse.jwt!);

    if (!success) {
      router.push(clientRoute.auth.login.use());
    }
    
    Cookies.set({ key: "id", data: authResponse.jwt!, maxAge: tokenResponse.payload!.exp! * 1000 - Date.now() });

    router.push(clientRoute.app.use());
  }
  
  return (
    <form className={styles.form} ref={formRef} onSubmit={handleFormSubmit}>
      <InputField
        type="text"
        label="Prénom"
        placeholder="Entre ton prénom ici..."
        name="firstName"
      />
      <InputField
        type="text"
        label="Nom de famille"
        placeholder="Entre ton nom de famille ici..."
        name="lastName"
      />
      <InputField
        type="email"
        label="Email"
        placeholder="Entre ton email ici..."
        name="email"
      />
      <InputField
        type="password"
        label="Mot de passe"
        placeholder="Entre ton mot de passe ici..."
        name="password"
      />
      <SubmitButton label="Créer mon compte" />
    </form>
  )
}

export default SignUpForm;
