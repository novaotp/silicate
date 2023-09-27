
'use client';

// React + Next
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Internal
import submitForm from './functions/submitForm';
import styles from './index.module.scss';
import { InputField, SubmitButton } from "../../../shared";

/** Returns the form of the sign-up page. */
const SignUpForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await submitForm(formRef, router);
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
