
'use client';

// React + Next
import { useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Internal
import styles from './index.module.scss';
import { InputField, SubmitButton } from "../../../shared";
import submitForm from './functions/submitForm';

/** Returns the main component for the log-in page. */
const LoginForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  /**
   * Handles the form submission.
   * @param event The form submission event.
   */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await submitForm(formRef, router);
  }
  
  return (
    <form className={styles.form} ref={formRef} onSubmit={handleFormSubmit}>
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
      <SubmitButton label="Connexion" />
    </form>
  )
}

export default LoginForm;
